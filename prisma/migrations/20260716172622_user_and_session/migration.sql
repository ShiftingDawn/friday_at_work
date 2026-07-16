/*
  Warnings:

  - You are about to drop the `workspaces` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `workspaceId` on the `consumptions` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `drinks` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `people` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "workspaces";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
INSERT INTO "new_consumptions" ("drinkId", "id", "personId", "price", "timestamp") SELECT "drinkId", "id", "personId", "price", "timestamp" FROM "consumptions";
DROP TABLE "consumptions";
ALTER TABLE "new_consumptions" RENAME TO "consumptions";
CREATE TABLE "new_drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_drinks" ("hidden", "id", "image", "name", "price") SELECT "hidden", "id", "image", "name", "price" FROM "drinks";
DROP TABLE "drinks";
ALTER TABLE "new_drinks" RENAME TO "drinks";
CREATE TABLE "new_people" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "reset" DATETIME
);
INSERT INTO "new_people" ("id", "name", "reset") SELECT "id", "name", "reset" FROM "people";
DROP TABLE "people";
ALTER TABLE "new_people" RENAME TO "people";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
