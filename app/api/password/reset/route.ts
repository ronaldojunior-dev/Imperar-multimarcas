import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { hashPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 5);
    if (limited) return limited;
    const { token, password } = await req.json();
    if (!token || String(password).length < 8) {
      return json({ error: "Token ou senha inválidos" }, 422);
    }

    const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!reset || reset.usedAt || reset.expiresAt < new Date()) {
      return json({ error: "Token expirado ou inválido" }, 400);
    }

    await prisma.$transaction([
      prisma.user.update({ where: { email: reset.email }, data: { password: await hashPassword(password) } }),
      prisma.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } })
    ]);

    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
