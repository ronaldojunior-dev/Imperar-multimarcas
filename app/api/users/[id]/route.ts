import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import { auditLog } from "@/lib/audit";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await requireAdmin();
    await prisma.user.delete({ where: { id } });
    await auditLog({ userId: session.user.id, action: "DELETE", entity: "User", entityId: id });
    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await requireAdmin();
    const data = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        active: Boolean(data.active)
      },
      select: { id: true, name: true, email: true, role: true, active: true }
    });
    await auditLog({ userId: session.user.id, action: "UPDATE", entity: "User", entityId: id });
    return json(user);
  } catch (error) {
    return apiError(error);
  }
}
