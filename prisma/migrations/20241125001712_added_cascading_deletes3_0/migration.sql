/*
  Warnings:

  - You are about to drop the column `addressId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[settingsID]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientID]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyID]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientID` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyID` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settingsID` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_addressId_fkey";

-- DropIndex
DROP INDEX "Client_addressId_key";

-- DropIndex
DROP INDEX "Property_addressId_key";

-- DropIndex
DROP INDEX "Settings_addressId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "clientID" TEXT NOT NULL,
ADD COLUMN     "propertyID" TEXT NOT NULL,
ADD COLUMN     "settingsID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_settingsID_key" ON "Address"("settingsID");

-- CreateIndex
CREATE UNIQUE INDEX "Address_clientID_key" ON "Address"("clientID");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyID_key" ON "Address"("propertyID");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_settingsID_fkey" FOREIGN KEY ("settingsID") REFERENCES "Settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyID_fkey" FOREIGN KEY ("propertyID") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
