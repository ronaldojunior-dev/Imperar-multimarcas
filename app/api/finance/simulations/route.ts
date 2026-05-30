import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, guardRateLimit, json } from "@/lib/api";
import { financingSchema } from "@/lib/validators";
import { calculateFinancing } from "@/lib/finance";

export async function POST(req: NextRequest) {
  try {
    const limited = guardRateLimit(req, 20);
    if (limited) return limited;
    const data = financingSchema.parse(await req.json());
    const result = calculateFinancing(data.vehiclePrice, data.downPayment, data.installments, data.monthlyRate);

    const simulation = await prisma.financingSimulation.create({
      data: {
        vehicleId: data.vehicleId || null,
        name: data.name,
        phone: data.phone,
        vehiclePrice: data.vehiclePrice,
        downPayment: data.downPayment,
        installments: data.installments,
        monthlyRate: data.monthlyRate,
        installmentValue: result.installmentValue,
        totalValue: result.totalValue
      }
    });

    return json(simulation, 201);
  } catch (error) {
    return apiError(error);
  }
}
