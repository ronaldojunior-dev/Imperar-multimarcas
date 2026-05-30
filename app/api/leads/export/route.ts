import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET(_req: NextRequest) {
  await requireSession();
  const leads = await prisma.lead.findMany({
    include: { vehicle: true },
    orderBy: { createdAt: "desc" }
  });

  const rows = [
    ["Criado em", "Nome", "Telefone", "Email", "Tipo", "Status", "Veículo", "Mensagem"],
    ...leads.map((lead) => [
      lead.createdAt.toISOString(),
      lead.name,
      lead.phone,
      lead.email ?? "",
      lead.type,
      lead.status,
      lead.vehicle ? `${lead.vehicle.brand} ${lead.vehicle.model}` : "",
      lead.message.replace(/\r?\n/g, " ")
    ])
  ];

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv"
    }
  });
}
