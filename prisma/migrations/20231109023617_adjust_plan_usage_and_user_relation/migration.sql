/*
  Warnings:

  - You are about to drop the column `userId` on the `PlanUsage` table. All the data in the column will be lost.
  - Made the column `planUsageId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlanUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "quantityEmailsAllowed" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_PlanUsage" ("id", "monitorings", "performanceTests", "quantityEmailsAllowed") SELECT "id", "monitorings", "performanceTests", "quantityEmailsAllowed" FROM "PlanUsage";
DROP TABLE "PlanUsage";
ALTER TABLE "new_PlanUsage" RENAME TO "PlanUsage";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "secondary_email" TEXT,
    "terciary_email" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "firebaseToken" TEXT NOT NULL,
    "weeklyReports" BOOLEAN NOT NULL DEFAULT false,
    "planId" TEXT,
    "planUsageId" TEXT NOT NULL,
    CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_planUsageId_fkey" FOREIGN KEY ("planUsageId") REFERENCES "PlanUsage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "email", "firebaseToken", "id", "name", "planId", "planUsageId", "secondary_email", "terciary_email", "weeklyReports") SELECT "avatarUrl", "email", "firebaseToken", "id", "name", "planId", "planUsageId", "secondary_email", "terciary_email", "weeklyReports" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
