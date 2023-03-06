/*
  Warnings:

  - You are about to drop the column `todoReps` on the `ExerciseSeries` table. All the data in the column will be lost.
  - You are about to drop the column `todoWeight` on the `ExerciseSeries` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseSeries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "ExerciseSeries_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseSeries" ("exerciseId", "id", "reps", "weight") SELECT "exerciseId", "id", "reps", "weight" FROM "ExerciseSeries";
DROP TABLE "ExerciseSeries";
ALTER TABLE "new_ExerciseSeries" RENAME TO "ExerciseSeries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
