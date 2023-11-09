/*
  Warnings:

  - Made the column `intervalMin` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "secondary_email" TEXT;
ALTER TABLE "User" ADD COLUMN "terciary_email" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "quantityEmailsAllowed" INTEGER NOT NULL DEFAULT 1,
    "intervalMin" INTEGER NOT NULL,
    "checkSSL" BOOLEAN,
    "sendPageNotifications" BOOLEAN
);
INSERT INTO "new_Plan" ("checkSSL", "id", "intervalMin", "monitorings", "name", "performanceTests", "sendPageNotifications", "slug") SELECT "checkSSL", "id", "intervalMin", "monitorings", "name", "performanceTests", "sendPageNotifications", "slug" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
CREATE TABLE "new_PlanUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "quantityEmailsAllowed" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_PlanUsage" ("id", "monitorings", "performanceTests") SELECT "id", "monitorings", "performanceTests" FROM "PlanUsage";
DROP TABLE "PlanUsage";
ALTER TABLE "new_PlanUsage" RENAME TO "PlanUsage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
