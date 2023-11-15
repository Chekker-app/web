-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlanUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL,
    "quantityEmailsAllowed" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT,
    CONSTRAINT "PlanUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlanUsage" ("id", "monitorings", "performanceTests", "quantityEmailsAllowed", "userId") SELECT "id", "monitorings", "performanceTests", "quantityEmailsAllowed", "userId" FROM "PlanUsage";
DROP TABLE "PlanUsage";
ALTER TABLE "new_PlanUsage" RENAME TO "PlanUsage";
CREATE UNIQUE INDEX "PlanUsage_userId_key" ON "PlanUsage"("userId");
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
    "planUsageId" TEXT,
    CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "email", "firebaseToken", "id", "name", "planId", "planUsageId", "secondary_email", "terciary_email", "weeklyReports") SELECT "avatarUrl", "email", "firebaseToken", "id", "name", "planId", "planUsageId", "secondary_email", "terciary_email", "weeklyReports" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
