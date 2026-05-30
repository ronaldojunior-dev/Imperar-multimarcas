import slugify from "slugify";
import { prisma } from "@/lib/prisma";

export function baseVehicleSlug(brand: string, model: string, version: string, year: number) {
  return slugify(`${brand}-${model}-${version}-${year}`, {
    lower: true,
    strict: true,
    locale: "pt"
  });
}

export async function uniqueVehicleSlug(brand: string, model: string, version: string, year: number, ignoreId?: string) {
  const base = baseVehicleSlug(brand, model, version, year);
  let slug = base;
  let suffix = 2;

  while (
    await prisma.vehicle.findFirst({
      where: { slug, ...(ignoreId ? { NOT: { id: ignoreId } } : {}) },
      select: { id: true }
    })
  ) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}
