/*
  Warnings:

  - Added the required column `date` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicianId` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "supervisorId" TEXT NOT NULL,
ADD COLUMN     "technicianId" TEXT NOT NULL;
