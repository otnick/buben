/*
  Warnings:

  - You are about to drop the column `mediaUrl` on the `Challenge` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    CONSTRAINT "Media_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "memberId" TEXT,
    CONSTRAINT "Challenge_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("completed", "description", "id", "memberId", "points", "teamId", "title") SELECT "completed", "description", "id", "memberId", "points", "teamId", "title" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
