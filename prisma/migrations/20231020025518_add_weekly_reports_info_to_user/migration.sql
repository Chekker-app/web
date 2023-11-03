-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "firebaseToken" TEXT NOT NULL,
    "weeklyReports" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("avatarUrl", "email", "firebaseToken", "id", "name") SELECT "avatarUrl", "email", "firebaseToken", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
