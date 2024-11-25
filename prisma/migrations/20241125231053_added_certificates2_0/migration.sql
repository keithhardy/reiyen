/*
  Warnings:

  - You are about to drop the column `type` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[certificateId]` on the table `DomesticVentilationCommissioningSheet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateId]` on the table `ElectricalInstallationCertificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateId]` on the table `ElectricalInstallationConditionReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateId]` on the table `FireSafetyDesignSummary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[certificateId]` on the table `MinorWorks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `certificateId` to the `DomesticVentilationCommissioningSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `ElectricalInstallationCertificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `ElectricalInstallationConditionReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `FireSafetyDesignSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificateId` to the `MinorWorks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" DROP CONSTRAINT "DomesticVentilationCommissioningSheet_id_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationCertificate" DROP CONSTRAINT "ElectricalInstallationCertificate_id_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" DROP CONSTRAINT "ElectricalInstallationConditionReport_id_fkey";

-- DropForeignKey
ALTER TABLE "FireSafetyDesignSummary" DROP CONSTRAINT "FireSafetyDesignSummary_id_fkey";

-- DropForeignKey
ALTER TABLE "MinorWorks" DROP CONSTRAINT "MinorWorks_id_fkey";

-- DropIndex
DROP INDEX "Certificate_typeId_key";

-- DropIndex
DROP INDEX "Certificate_type_typeId_idx";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "type",
DROP COLUMN "typeId";

-- AlterTable
ALTER TABLE "DomesticVentilationCommissioningSheet" ADD COLUMN     "certificateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ElectricalInstallationCertificate" ADD COLUMN     "certificateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ElectricalInstallationConditionReport" ADD COLUMN     "certificateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FireSafetyDesignSummary" ADD COLUMN     "certificateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MinorWorks" ADD COLUMN     "certificateId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CertificateType";

-- CreateIndex
CREATE UNIQUE INDEX "DomesticVentilationCommissioningSheet_certificateId_key" ON "DomesticVentilationCommissioningSheet"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricalInstallationCertificate_certificateId_key" ON "ElectricalInstallationCertificate"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "ElectricalInstallationConditionReport_certificateId_key" ON "ElectricalInstallationConditionReport"("certificateId");

-- CreateIndex
CREATE INDEX "ElectricalInstallationConditionReport_certificateId_idx" ON "ElectricalInstallationConditionReport"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "FireSafetyDesignSummary_certificateId_key" ON "FireSafetyDesignSummary"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "MinorWorks_certificateId_key" ON "MinorWorks"("certificateId");

-- AddForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" ADD CONSTRAINT "ElectricalInstallationConditionReport_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalInstallationCertificate" ADD CONSTRAINT "ElectricalInstallationCertificate_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinorWorks" ADD CONSTRAINT "MinorWorks_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireSafetyDesignSummary" ADD CONSTRAINT "FireSafetyDesignSummary_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" ADD CONSTRAINT "DomesticVentilationCommissioningSheet_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
