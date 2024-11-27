/*
  Warnings:

  - You are about to drop the column `certificateId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_certificateId_fkey";

-- DropIndex
DROP INDEX "Property_certificateId_key";

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "certificateId";

-- CreateIndex
CREATE INDEX "Certificate_propertyId_idx" ON "Certificate"("propertyId");

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
