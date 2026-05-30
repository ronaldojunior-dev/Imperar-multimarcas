CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'VENDEDOR');
CREATE TYPE "VehicleStatus" AS ENUM ('ATIVO', 'RESERVADO', 'VENDIDO', 'ARQUIVADO');
CREATE TYPE "LeadStatus" AS ENUM ('NOVO', 'CONTATO', 'NEGOCIACAO', 'FECHADO', 'PERDIDO');
CREATE TYPE "LeadType" AS ENUM ('CONTATO', 'FINANCIAMENTO', 'VENDA_VEICULO', 'WHATSAPP');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'VENDEDOR',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PasswordResetToken" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Vehicle" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "mileage" INTEGER NOT NULL,
  "fuel" TEXT NOT NULL,
  "transmission" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "doors" INTEGER NOT NULL,
  "plateFinal" TEXT NOT NULL,
  "price" DECIMAL(12,2) NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "status" "VehicleStatus" NOT NULL DEFAULT 'ATIVO',
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VehicleImage" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "VehicleImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT,
  "type" "LeadType" NOT NULL DEFAULT 'CONTATO',
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "message" TEXT NOT NULL,
  "status" "LeadStatus" NOT NULL DEFAULT 'NOVO',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeadNote" (
  "id" TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "note" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeadNote_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeadHistory" (
  "id" TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "from" TEXT,
  "to" TEXT NOT NULL,
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeadHistory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Testimonial" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "photo" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Banner" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "link" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "startDate" TIMESTAMP(3),
  "endDate" TIMESTAMP(3),
  CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Settings" (
  "id" TEXT NOT NULL,
  "companyName" TEXT NOT NULL,
  "logo" TEXT,
  "phone" TEXT NOT NULL,
  "whatsapp" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "facebook" TEXT,
  "instagram" TEXT,
  "youtube" TEXT,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "googleAnalytics" TEXT,
  "metaPixel" TEXT,
  CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FinancingSimulation" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT,
  "name" TEXT,
  "phone" TEXT,
  "vehiclePrice" DECIMAL(12,2) NOT NULL,
  "downPayment" DECIMAL(12,2) NOT NULL,
  "installments" INTEGER NOT NULL,
  "monthlyRate" DECIMAL(6,4) NOT NULL,
  "installmentValue" DECIMAL(12,2) NOT NULL,
  "totalValue" DECIMAL(12,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FinancingSimulation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VehicleView" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "ip" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "VehicleView_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB,
  "ip" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");
CREATE INDEX "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");
CREATE INDEX "Vehicle_brand_model_idx" ON "Vehicle"("brand", "model");
CREATE INDEX "Vehicle_featured_status_idx" ON "Vehicle"("featured", "status");
CREATE INDEX "Vehicle_price_idx" ON "Vehicle"("price");
CREATE INDEX "VehicleImage_vehicleId_order_idx" ON "VehicleImage"("vehicleId", "order");
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX "Lead_vehicleId_idx" ON "Lead"("vehicleId");
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

ALTER TABLE "VehicleImage" ADD CONSTRAINT "VehicleImage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LeadNote" ADD CONSTRAINT "LeadNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadHistory" ADD CONSTRAINT "LeadHistory_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FinancingSimulation" ADD CONSTRAINT "FinancingSimulation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "VehicleView" ADD CONSTRAINT "VehicleView_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
