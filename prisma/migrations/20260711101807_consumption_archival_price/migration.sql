/*
  Warnings:

  - Added the required column `price` to the `consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "drinkId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "consumptions_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consumptions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consumptions" ("drinkId", "id", "personId", "timestamp") SELECT "drinkId", "id", "personId", "timestamp" FROM "consumptions";
DROP TABLE "consumptions";
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
