-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT,
    "monitorings" INTEGER NOT NULL,
    "price" INTEGER,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewalDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "performanceTests" INTEGER NOT NULL,
    "usedEmails" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("id", "monitorings", "performanceTests", "usedEmails", "userId") SELECT "id", "monitorings", "performanceTests", "usedEmails", "userId" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
