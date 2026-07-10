/*
  Warnings:

  - Added the required column `image` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Drink" ("id", "name", "price") SELECT "id", "name", "price" FROM "Drink";
DROP TABLE "Drink";
ALTER TABLE "new_Drink" RENAME TO "Drink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
