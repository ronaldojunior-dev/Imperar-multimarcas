import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export function auditLog(input: {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  metadata?: Prisma.InputJsonValue;
  ip?: string | null;
}) {
  return prisma.auditLog.create({
    data: {
      userId: input.userId ?? null,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      metadata: input.metadata,
      ip: input.ip ?? null
    }
  });
}
