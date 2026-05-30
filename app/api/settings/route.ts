import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { settingsSchema } from "@/lib/validators";
import { auditLog } from "@/lib/audit";

export async function GET() {
  const settings = await prisma.settings.findFirst();
  return json(settings);
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireSession();
    const data = settingsSchema.parse(await req.json());
    const current = await prisma.settings.findFirst();
    const settings = current
      ? await prisma.settings.update({ where: { id: current.id }, data })
      : await prisma.settings.create({ data });

    await auditLog({ userId: session.user.id, action: "UPDATE", entity: "Settings", entityId: settings.id });
    return json(settings);
  } catch (error) {
    return apiError(error);
  }
}
