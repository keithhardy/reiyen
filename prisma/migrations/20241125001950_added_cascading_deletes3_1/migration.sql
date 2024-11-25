/*
  Warnings:

  - You are about to drop the column `clientID` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `propertyID` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `settingsID` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[settingsId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settingsId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientID_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_propertyID_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_settingsID_fkey";

-- DropIndex
DROP INDEX "Address_clientID_key";

-- DropIndex
DROP INDEX "Address_propertyID_key";

-- DropIndex
DROP INDEX "Address_settingsID_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "clientID",
DROP COLUMN "propertyID",
DROP COLUMN "settingsID",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "settingsId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_settingsId_key" ON "Address"("settingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_clientId_key" ON "Address"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyId_key" ON "Address"("propertyId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
