/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Seance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN "img" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Seance" ("id", "title") SELECT "id", "title" FROM "Seance";
DROP TABLE "Seance";
ALTER TABLE "new_Seance" RENAME TO "Seance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
