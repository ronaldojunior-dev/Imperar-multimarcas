import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
  const vehicles = await getSitemapVehicles();

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/estoque`, lastModified: new Date() },
    { url: `${baseUrl}/financiamento`, lastModified: new Date() },
    { url: `${baseUrl}/vender-meu-carro`, lastModified: new Date() },
    ...vehicles.map((vehicle) => ({
      url: `${baseUrl}/veiculos/${vehicle.slug}`,
      lastModified: vehicle.updatedAt
    }))
  ];
}

async function getSitemapVehicles() {
  if (!process.env.DATABASE_URL) return [];

  try {
    return await prisma.vehicle.findMany({
      where: { status: { in: ["ATIVO", "RESERVADO"] } },
      select: { slug: true, updatedAt: true }
    });
  } catch (error) {
    console.warn("Sitemap generated without vehicle URLs because the database is unavailable.", error);
    return [];
  }
}
