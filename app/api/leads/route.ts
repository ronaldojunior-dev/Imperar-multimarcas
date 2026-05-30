import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { leadSchema } from "@/lib/validators";
import { pagination, paged } from "@/lib/pagination";
import { requireSession } from "@/lib/session";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  try {
    await requireSession();
    const { searchParams } = req.nextUrl;
    const { page, perPage, skip, take } = pagination(searchParams);
    const q = searchParams.get("q") ?? undefined;
    const status = searchParams.get("status") ?? undefined;

    const where = {
      ...(status ? { status: status as never } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { phone: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } }
            ]
          }
        : {})
    };

    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: { vehicle: true, notes: true, history: true },
        orderBy: { createdAt: "desc" },
        skip,
        take
      }),
      prisma.lead.count({ where })
    ]);

    return json(paged(items, total, page, perPage));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 20);
    if (limited) return limited;
    const data = leadSchema.parse(sanitizeObject(await req.json()));

    const lead = await prisma.lead.create({
      data: {
        vehicleId: data.vehicleId || null,
        type: data.type,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
        history: { create: { to: "NOVO", note: "Lead criado pelo site" } }
      }
    });

    return json(lead, 201);
  } catch (error) {
    return apiError(error);
  }
}
