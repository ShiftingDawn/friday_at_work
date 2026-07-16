/*
  Warnings:

  - Added the required column `image` to the `drinks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_drinks" ("id", "name", "price") SELECT "id", "name", "price" FROM "drinks";
DROP TABLE "drinks";
ALTER TABLE "new_drinks" RENAME TO "drinks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
