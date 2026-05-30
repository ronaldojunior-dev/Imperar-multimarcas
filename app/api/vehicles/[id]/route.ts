import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { vehicleSchema } from "@/lib/validators";
import { uniqueVehicleSlug } from "@/lib/slug";
import { auditLog } from "@/lib/audit";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const limited = guardRateLimit(req);
  if (limited) return limited;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } }
  });

  if (!vehicle) return json({ error: "Veículo não encontrado" }, 404);
  return json(vehicle);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const limited = guardRateLimit(req, 30);
    if (limited) return limited;
    const session = await requireSession();
    const data = vehicleSchema.parse(sanitizeObject(await req.json()));
    const slug = await uniqueVehicleSlug(data.brand, data.model, data.version, data.year, id);

    const vehicle = await prisma.$transaction(async (tx) => {
      await tx.vehicleImage.deleteMany({ where: { vehicleId: id } });
      return tx.vehicle.update({
        where: { id },
        data: {
          ...data,
          slug,
          price: data.price,
          images: { create: data.images.map((imageUrl, order) => ({ imageUrl, order })) }
        },
        include: { images: true }
      });
    });

    await auditLog({ userId: session.user.id, action: "UPDATE", entity: "Vehicle", entityId: vehicle.id });
    return json(vehicle);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const limited = guardRateLimit(req, 20);
    if (limited) return limited;
    const session = await requireSession();
    await prisma.vehicle.delete({ where: { id } });
    await auditLog({ userId: session.user.id, action: "DELETE", entity: "Vehicle", entityId: id });
    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
