/*
  Warnings:

  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `workspaceId` on the `Consumption` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `Drink` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `Person` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Workspace";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Consumption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "drinkId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Consumption_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consumption_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Consumption" ("drinkId", "id", "personId", "price", "timestamp") SELECT "drinkId", "id", "personId", "price", "timestamp" FROM "Consumption";
DROP TABLE "Consumption";
ALTER TABLE "new_Consumption" RENAME TO "Consumption";
CREATE TABLE "new_Drink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Drink" ("hidden", "id", "image", "name", "price") SELECT "hidden", "id", "image", "name", "price" FROM "Drink";
DROP TABLE "Drink";
ALTER TABLE "new_Drink" RENAME TO "Drink";
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "reset" DATETIME
);
INSERT INTO "new_Person" ("id", "name", "reset") SELECT "id", "name", "reset" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
