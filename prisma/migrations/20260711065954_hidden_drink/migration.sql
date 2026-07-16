-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_drinks" ("id", "image", "name", "price") SELECT "id", "image", "name", "price" FROM "drinks";
DROP TABLE "drinks";
ALTER TABLE "new_drinks" RENAME TO "drinks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
