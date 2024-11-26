/*
  Warnings:

  - You are about to drop the `Certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomesticVentilationCommissioningSheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ElectricalInstallationCertificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ElectricalInstallationConditionReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FireSafetyDesignSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MinorWorks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" DROP CONSTRAINT "DomesticVentilationCommissioningSheet_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationCertificate" DROP CONSTRAINT "ElectricalInstallationCertificate_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" DROP CONSTRAINT "ElectricalInstallationConditionReport_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "FireSafetyDesignSummary" DROP CONSTRAINT "FireSafetyDesignSummary_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "MinorWorks" DROP CONSTRAINT "MinorWorks_certificateId_fkey";

-- DropTable
DROP TABLE "Certificate";

-- DropTable
DROP TABLE "DomesticVentilationCommissioningSheet";

-- DropTable
DROP TABLE "ElectricalInstallationCertificate";

-- DropTable
DROP TABLE "ElectricalInstallationConditionReport";

-- DropTable
DROP TABLE "FireSafetyDesignSummary";

-- DropTable
DROP TABLE "MinorWorks";

-- DropEnum
DROP TYPE "CertificateType";
