/*
  Warnings:

  - Added the required column `workspaceId` to the `consumptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `drinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES users ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "drinkId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "consumptions_personId_fkey" FOREIGN KEY ("personId") REFERENCES people ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consumptions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES drinks ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consumptions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES workspaces ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consumptions" ("drinkId", "id", "personId", "price", "timestamp") SELECT "drinkId", "id", "personId", "price", "timestamp" FROM consumptions;
DROP TABLE consumptions;
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
CREATE TABLE "new_drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "drinks_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES workspaces ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_drinks" ("hidden", "id", "image", "name", "price") SELECT "hidden", "id", "image", "name", "price" FROM drinks;
DROP TABLE drinks;
ALTER TABLE "new_drinks" RENAME TO "drinks";
CREATE TABLE "new_people" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reset" DATETIME,
    CONSTRAINT "people_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES workspaces ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_people" ("id", "name", "reset") SELECT "id", "name", "reset" FROM people;
DROP TABLE people;
ALTER TABLE "new_people" RENAME TO "people";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_name_ownerId_key" ON workspaces("name", "ownerId");
