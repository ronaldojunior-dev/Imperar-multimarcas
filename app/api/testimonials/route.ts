import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { testimonialSchema } from "@/lib/validators";

export async function GET() {
  return json(await prisma.testimonial.findMany({ where: { active: true } }));
}

export async function POST(req: NextRequest) {
  try {
    await requireSession();
    const data = testimonialSchema.parse(await req.json());
    const testimonial = await prisma.testimonial.create({ data });
    return json(testimonial, 201);
  } catch (error) {
    return apiError(error);
  }
}
