/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Preferences` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Preferences` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Qualification` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Qualification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Qualification" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
