import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  });
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return json({ error: "Dados inválidos", issues: error.flatten() }, 422);
  }

  if (error instanceof Error) {
    return json({ error: error.message }, 400);
  }

  return json({ error: "Erro interno" }, 500);
}

export function guardRateLimit(req: NextRequest, limit = 80) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const result = rateLimit(`${ip}:${req.nextUrl.pathname}`, limit);

  if (!result.allowed) {
    return json({ error: "Muitas requisições. Tente novamente em instantes." }, 429);
  }

  return null;
}
