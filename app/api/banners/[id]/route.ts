import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { bannerSchema } from "@/lib/validators";
import { requireSession } from "@/lib/session";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await requireSession();
    const data = bannerSchema.parse(await req.json());
    const banner = await prisma.banner.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    });
    return json(banner);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await requireSession();
    await prisma.banner.delete({ where: { id } });
    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
