import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { pagination, paged } from "@/lib/pagination";
import { vehicleSchema } from "@/lib/validators";
import { requireSession } from "@/lib/session";
import { uniqueVehicleSlug } from "@/lib/slug";
import { sanitizeObject } from "@/lib/sanitize";
import { auditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  const limited = guardRateLimit(req);
  if (limited) return limited;

  const { searchParams } = req.nextUrl;
  const { page, perPage, skip, take } = pagination(searchParams);
  const q = searchParams.get("q") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const featured = searchParams.get("featured");
  const brand = searchParams.get("brand") ?? undefined;
  const orderBy = searchParams.get("orderBy") ?? "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const where = {
    ...(q
      ? {
          OR: [
            { brand: { contains: q, mode: "insensitive" as const } },
            { model: { contains: q, mode: "insensitive" as const } },
            { version: { contains: q, mode: "insensitive" as const } }
          ]
        }
      : {}),
    ...(status ? { status: status as never } : {}),
    ...(brand ? { brand: { equals: brand, mode: "insensitive" as const } } : {}),
    ...(featured ? { featured: featured === "true" } : {})
  };

  const [items, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { [orderBy]: order },
      skip,
      take
    }),
    prisma.vehicle.count({ where })
  ]);

  return json(paged(items, total, page, perPage));
}

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 30);
    if (limited) return limited;
    const session = await requireSession();
    const data = vehicleSchema.parse(sanitizeObject(await req.json()));
    const slug = await uniqueVehicleSlug(data.brand, data.model, data.version, data.year);

    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        slug,
        price: data.price,
        images: {
          create: data.images.map((imageUrl, order) => ({ imageUrl, order }))
        }
      },
      include: { images: true }
    });

    await auditLog({ userId: session.user.id, action: "CREATE", entity: "Vehicle", entityId: vehicle.id });
    return json(vehicle, 201);
  } catch (error) {
    return apiError(error);
  }
}
