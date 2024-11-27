/*
  Warnings:

  - A unique constraint covering the columns `[certificateId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "certificateId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Property_certificateId_key" ON "Property"("certificateId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
