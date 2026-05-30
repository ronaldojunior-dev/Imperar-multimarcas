import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { bannerSchema } from "@/lib/validators";
import { requireSession } from "@/lib/session";

export async function GET() {
  return json(await prisma.banner.findMany({ orderBy: { startDate: "desc" } }));
}

export async function POST(req: NextRequest) {
  try {
    await requireSession();
    const data = bannerSchema.parse(await req.json());
    const banner = await prisma.banner.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    });
    return json(banner, 201);
  } catch (error) {
    return apiError(error);
  }
}
