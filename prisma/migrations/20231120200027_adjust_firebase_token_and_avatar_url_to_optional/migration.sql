-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "secondary_email" TEXT,
    "terciary_email" TEXT,
    "avatarUrl" TEXT,
    "firebaseToken" TEXT,
    "weeklyReports" BOOLEAN NOT NULL DEFAULT false,
    "planId" TEXT,
    "subscriptionId" TEXT,
    CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "email", "firebaseToken", "id", "name", "password", "planId", "secondary_email", "subscriptionId", "terciary_email", "weeklyReports") SELECT "avatarUrl", "email", "firebaseToken", "id", "name", "password", "planId", "secondary_email", "subscriptionId", "terciary_email", "weeklyReports" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
