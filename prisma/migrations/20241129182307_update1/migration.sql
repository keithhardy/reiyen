/*
  Warnings:

  - You are about to drop the column `technicianId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `technicianSignature` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `technicianSignatureDate` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "technicianId",
DROP COLUMN "technicianSignature",
DROP COLUMN "technicianSignatureDate",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userSignature" TEXT,
ADD COLUMN     "userSignatureDate" TEXT;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
