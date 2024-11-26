-- CreateTable
CREATE TABLE "ElectricalInstallationConditionReport" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ElectricalInstallationConditionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricalInstallationCertificate" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ElectricalInstallationCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinorWorks" (
    "id" TEXT NOT NULL,

    CONSTRAINT "MinorWorks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FireSafetyDesignSummary" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FireSafetyDesignSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomesticVentilationCommissioningSheet" (
    "id" TEXT NOT NULL,

    CONSTRAINT "DomesticVentilationCommissioningSheet_pkey" PRIMARY KEY ("id")
);
