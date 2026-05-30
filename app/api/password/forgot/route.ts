import crypto from "crypto";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 5);
    if (limited) return limited;
    const { email } = await req.json();
    const normalized = String(email ?? "").toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalized } });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({
        data: {
          email: normalized,
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30)
        }
      });
      console.info(`Password reset token for ${normalized}: ${token}`);
    }

    return json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
