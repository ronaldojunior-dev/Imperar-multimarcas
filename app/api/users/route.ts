import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, json } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import { userSchema } from "@/lib/validators";
import { hashPassword } from "@/lib/password";
import { auditLog } from "@/lib/audit";

export async function GET() {
  await requireAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true, updatedAt: true }
  });
  return json(users);
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const data = userSchema.parse(await req.json());
    const user = await prisma.user.create({
      data: { ...data, email: data.email.toLowerCase(), password: await hashPassword(data.password) },
      select: { id: true, name: true, email: true, role: true, active: true }
    });
    await auditLog({ userId: session.user.id, action: "CREATE", entity: "User", entityId: user.id });
    return json(user, 201);
  } catch (error) {
    return apiError(error);
  }
}
