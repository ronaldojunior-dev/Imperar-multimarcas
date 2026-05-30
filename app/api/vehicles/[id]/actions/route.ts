import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { auditLog } from "@/lib/audit";
import { uniqueVehicleSlug } from "@/lib/slug";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await requireSession();
    const { action } = await req.json();
    const current = await prisma.vehicle.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } }
    });

    if (!current) return json({ error: "Veículo não encontrado" }, 404);

    if (action === "duplicate") {
      const slug = await uniqueVehicleSlug(current.brand, current.model, current.version, current.year);
      const duplicated = await prisma.vehicle.create({
        data: {
          slug,
          brand: current.brand,
          model: current.model,
          version: `${current.version} - Cópia`,
          year: current.year,
          mileage: current.mileage,
          fuel: current.fuel,
          transmission: current.transmission,
          color: current.color,
          doors: current.doors,
          plateFinal: current.plateFinal,
          price: current.price,
          featured: false,
          status: "ARQUIVADO",
          description: current.description,
          images: {
            create: current.images.map((img) => ({ imageUrl: img.imageUrl, order: img.order }))
          }
        }
      });
      await auditLog({ userId: session.user.id, action: "DUPLICATE", entity: "Vehicle", entityId: duplicated.id });
      return json(duplicated, 201);
    }

    const statusMap: Record<string, "ATIVO" | "RESERVADO" | "VENDIDO" | "ARQUIVADO"> = {
      archive: "ARQUIVADO",
      active: "ATIVO",
      sold: "VENDIDO",
      reserved: "RESERVADO"
    };

    if (action === "feature") {
      const vehicle = await prisma.vehicle.update({
        where: { id },
        data: { featured: !current.featured }
      });
      await auditLog({ userId: session.user.id, action: "FEATURE", entity: "Vehicle", entityId: id });
      return json(vehicle);
    }

    if (statusMap[action]) {
      const vehicle = await prisma.vehicle.update({
        where: { id },
        data: { status: statusMap[action] }
      });
      await auditLog({ userId: session.user.id, action: action.toUpperCase(), entity: "Vehicle", entityId: id });
      return json(vehicle);
    }

    return json({ error: "Ação inválida" }, 400);
  } catch (error) {
    return apiError(error);
  }
}
