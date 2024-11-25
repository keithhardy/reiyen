/*
  Warnings:

  - You are about to drop the column `name` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[typeId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('ELECTRICAL_INSTALLATION_CONDITION_REPORT', 'ELECTRICAL_INSTALLATION_CERTIFICATE', 'MINOR_WORKS', 'FIRE_SAFETY_DESIGN_SUMMARY', 'DOMESTIC_VENTILATION_COMMISSIONING_SHEET');

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "name",
ADD COLUMN     "type" "CertificateType" NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ElectricalInstallationConditionReport" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ElectricalInstallationConditionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricalInstallationCertificate" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ElectricalInstallationCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinorWorks" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MinorWorks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FireSafetyDesignSummary" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FireSafetyDesignSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomesticVentilationCommissioningSheet" (
    "id" TEXT NOT NULL,

    CONSTRAINT "DomesticVentilationCommissioningSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_typeId_key" ON "Certificate"("typeId");

-- CreateIndex
CREATE INDEX "Certificate_type_typeId_idx" ON "Certificate"("type", "typeId");

-- AddForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" ADD CONSTRAINT "ElectricalInstallationConditionReport_id_fkey" FOREIGN KEY ("id") REFERENCES "Certificate"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalInstallationCertificate" ADD CONSTRAINT "ElectricalInstallationCertificate_id_fkey" FOREIGN KEY ("id") REFERENCES "Certificate"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinorWorks" ADD CONSTRAINT "MinorWorks_id_fkey" FOREIGN KEY ("id") REFERENCES "Certificate"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireSafetyDesignSummary" ADD CONSTRAINT "FireSafetyDesignSummary_id_fkey" FOREIGN KEY ("id") REFERENCES "Certificate"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" ADD CONSTRAINT "DomesticVentilationCommissioningSheet_id_fkey" FOREIGN KEY ("id") REFERENCES "Certificate"("typeId") ON DELETE CASCADE ON UPDATE CASCADE;
