/*
  Warnings:

  - Changed the type of `status` on the `Certificate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('MINOR_WORKS', 'ELECTRICAL_INSTALLATION_CERTIFICATE', 'ELECTRICAL_INSTALLATION_CONDITION_REPORT', 'FIRE_SAFETY_DESIGN_SUMMARY', 'DOMESTIC_VENTILATION_COMMISSIONING_SHEET');

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "status",
ADD COLUMN     "status" "CertificateStatus" NOT NULL;
