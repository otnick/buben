/*
  Warnings:

  - Added the required column `description` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "mediaUrl" TEXT,
    "points" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "memberId" TEXT,
    CONSTRAINT "Challenge_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("completed", "id", "mediaUrl", "memberId", "points", "teamId", "title") SELECT "completed", "id", "mediaUrl", "memberId", "points", "teamId", "title" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
