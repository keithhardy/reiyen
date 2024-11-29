/*
  Warnings:

  - The values [MINOR_WORKS,ELECTRICAL_INSTALLATION_CERTIFICATE,ELECTRICAL_INSTALLATION_CONDITION_REPORT,FIRE_SAFETY_DESIGN_SUMMARY,DOMESTIC_VENTILATION_COMMISSIONING_SHEET] on the enum `CertificateStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CertificateStatus_new" AS ENUM ('IN_PROGRESS', 'READY_FOR_SUPERVISOR', 'COMPLETE');
ALTER TABLE "Certificate" ALTER COLUMN "status" TYPE "CertificateStatus_new" USING ("status"::text::"CertificateStatus_new");
ALTER TYPE "CertificateStatus" RENAME TO "CertificateStatus_old";
ALTER TYPE "CertificateStatus_new" RENAME TO "CertificateStatus";
DROP TYPE "CertificateStatus_old";
COMMIT;
