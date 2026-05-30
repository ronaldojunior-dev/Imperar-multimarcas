import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { testimonialSchema } from "@/lib/validators";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await requireSession();
    const data = testimonialSchema.parse(await req.json());
    return json(await prisma.testimonial.update({ where: { id }, data }));
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await requireSession();
    await prisma.testimonial.delete({ where: { id } });
    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
