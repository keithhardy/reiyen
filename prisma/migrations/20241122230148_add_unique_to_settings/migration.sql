/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Settings_id_key" ON "Settings"("id");
