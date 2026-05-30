import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { leadStatusSchema } from "@/lib/validators";
import { requireSession } from "@/lib/session";
import { auditLog } from "@/lib/audit";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await requireSession();
    const data = leadStatusSchema.parse(await req.json());
    const current = await prisma.lead.findUnique({ where: { id } });
    if (!current) return json({ error: "Lead não encontrado" }, 404);

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status: data.status,
        history: {
          create: {
            from: current.status,
            to: data.status,
            note: data.note
          }
        },
        ...(data.note ? { notes: { create: { note: data.note } } } : {})
      },
      include: { notes: true, history: true }
    });

    await auditLog({ userId: session.user.id, action: "UPDATE_STATUS", entity: "Lead", entityId: lead.id });
    return json(lead);
  } catch (error) {
    return apiError(error);
  }
}
