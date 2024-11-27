-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "supervisorSignature" TEXT,
ADD COLUMN     "supervisorSignatureDate" TEXT,
ADD COLUMN     "technicianSignature" TEXT,
ADD COLUMN     "technicianSignatureDate" TEXT,
ALTER COLUMN "supervisorId" DROP NOT NULL;
