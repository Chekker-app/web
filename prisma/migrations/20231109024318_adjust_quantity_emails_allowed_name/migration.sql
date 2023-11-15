/*
  Warnings:

  - You are about to drop the column `quantityEmailsAllowed` on the `PlanUsage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlanUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "usedEmails" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT,
    CONSTRAINT "PlanUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlanUsage" ("id", "monitorings", "performanceTests", "userId") SELECT "id", "monitorings", "performanceTests", "userId" FROM "PlanUsage";
DROP TABLE "PlanUsage";
ALTER TABLE "new_PlanUsage" RENAME TO "PlanUsage";
CREATE UNIQUE INDEX "PlanUsage_userId_key" ON "PlanUsage"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
