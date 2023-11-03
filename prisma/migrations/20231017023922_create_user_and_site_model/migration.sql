-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "firebaseToken" TEXT NOT NULL
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
    "userId" TEXT NOT NULL,
    CONSTRAINT "Site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
