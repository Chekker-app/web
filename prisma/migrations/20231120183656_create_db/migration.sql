-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "secondary_email" TEXT,
    "terciary_email" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "firebaseToken" TEXT NOT NULL,
    "weeklyReports" BOOLEAN NOT NULL DEFAULT false,
    "planId" TEXT,
    "subscriptionId" TEXT,
    CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "checkIntervalTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sslDaysRemaining" INTEGER NOT NULL,
    "sslValidFrom" TEXT NOT NULL,
    "sslValidTo" TEXT NOT NULL,
    "sslValidForDomains" TEXT NOT NULL,
    "sslRememberIn" INTEGER NOT NULL,
    "sslSendReminders" BOOLEAN NOT NULL,
    "main_email" TEXT,
    "secondary_email" TEXT,
    "terciary_email" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "quantityEmailsAllowed" INTEGER NOT NULL DEFAULT 1,
    "intervalMin" INTEGER NOT NULL,
    "checkSSL" BOOLEAN,
    "sendSslEmails" BOOLEAN,
    "sendPageNotifications" BOOLEAN
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "usedEmails" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
