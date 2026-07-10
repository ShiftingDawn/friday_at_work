-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT
);
INSERT INTO "new_Drink" ("id", "image", "name", "price") SELECT "id", "image", "name", "price" FROM "Drink";
DROP TABLE "Drink";
ALTER TABLE "new_Drink" RENAME TO "Drink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
