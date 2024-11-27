-- DropForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" DROP CONSTRAINT "DomesticVentilationCommissioningSheet_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationCertificate" DROP CONSTRAINT "ElectricalInstallationCertificate_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" DROP CONSTRAINT "ElectricalInstallationConditionReport_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_userId_fkey";

-- DropForeignKey
ALTER TABLE "FireSafetyDesignSummary" DROP CONSTRAINT "FireSafetyDesignSummary_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "MinorWorks" DROP CONSTRAINT "MinorWorks_certificateId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_userId_fkey";

-- AddForeignKey
ALTER TABLE "DomesticVentilationCommissioningSheet" ADD CONSTRAINT "DomesticVentilationCommissioningSheet_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalInstallationCertificate" ADD CONSTRAINT "ElectricalInstallationCertificate_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricalInstallationConditionReport" ADD CONSTRAINT "ElectricalInstallationConditionReport_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireSafetyDesignSummary" ADD CONSTRAINT "FireSafetyDesignSummary_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinorWorks" ADD CONSTRAINT "MinorWorks_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
