-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PlanUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monitorings" INTEGER NOT NULL,
    "performanceTests" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "firebaseToken" TEXT NOT NULL,
    "weeklyReports" BOOLEAN NOT NULL DEFAULT false,
    "planId" TEXT,
    "planUsageId" TEXT,
    CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_planUsageId_fkey" FOREIGN KEY ("planUsageId") REFERENCES "PlanUsage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "email", "firebaseToken", "id", "name", "weeklyReports") SELECT "avatarUrl", "email", "firebaseToken", "id", "name", "weeklyReports" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
