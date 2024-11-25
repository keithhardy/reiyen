/*
  Warnings:

  - Added the required column `type` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('ELECTRICAL_INSTALLATION_CONDITION_REPORT', 'ELECTRICAL_INSTALLATION_CERTIFICATE', 'MINOR_WORKS', 'FIRE_SAFETY_DESIGN_SUMMARY', 'DOMESTIC_VENTILATION_COMMISSIONING_SHEET');

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "type" "CertificateType" NOT NULL;
