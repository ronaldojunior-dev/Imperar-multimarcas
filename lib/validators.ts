import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z.string().min(2),
  model: z.string().min(1),
  version: z.string().min(1),
  year: z.coerce.number().int().min(1950).max(2100),
  mileage: z.coerce.number().int().min(0),
  fuel: z.string().min(2),
  transmission: z.string().min(2),
  color: z.string().min(2),
  doors: z.coerce.number().int().min(2).max(6),
  plateFinal: z.string().min(1).max(2),
  price: z.coerce.number().positive(),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["ATIVO", "RESERVADO", "VENDIDO", "ARQUIVADO"]).default("ATIVO"),
  description: z.string().min(10),
  images: z.array(z.string().url()).default([])
});

export const leadSchema = z.object({
  vehicleId: z.string().optional().nullable(),
  type: z.enum(["CONTATO", "FINANCIAMENTO", "VENDA_VEICULO", "WHATSAPP"]).default("CONTATO"),
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(2)
});

export const leadStatusSchema = z.object({
  status: z.enum(["NOVO", "CONTATO", "NEGOCIACAO", "FECHADO", "PERDIDO"]),
  note: z.string().optional()
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "VENDEDOR"]),
  active: z.coerce.boolean().default(true)
});

export const settingsSchema = z.object({
  companyName: z.string().min(2),
  logo: z.string().optional().nullable(),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  email: z.string().email(),
  address: z.string().min(5),
  facebook: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  googleAnalytics: z.string().optional().nullable(),
  metaPixel: z.string().optional().nullable()
});

export const bannerSchema = z.object({
  title: z.string().min(2),
  image: z.string().url(),
  link: z.string().optional().nullable(),
  active: z.coerce.boolean().default(true),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable()
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  photo: z.string().url(),
  text: z.string().min(8),
  active: z.coerce.boolean().default(true)
});

export const financingSchema = z.object({
  vehicleId: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  vehiclePrice: z.coerce.number().positive(),
  downPayment: z.coerce.number().min(0),
  installments: z.coerce.number().int().min(1).max(80),
  monthlyRate: z.coerce.number().min(0).max(10)
});
