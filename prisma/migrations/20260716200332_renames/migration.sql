/*
  Warnings:

  - You are about to drop the `Consumption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Drink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "Consumption" RENAME TO "consumptions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "Drink" RENAME TO "drinks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "Person" RENAME TO "people";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "Session" RENAME TO "sessions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "User" RENAME TO "users";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
ALTER TABLE "Workspace" RENAME TO "workspaces";
PRAGMA foreign_keys=on;