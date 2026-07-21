/*
  Warnings:

  - The primary key for the `consumptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `drinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `people` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workspace_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workspaces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `creatorId` to the `consumptions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `consumptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workspaceId` on the `consumptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `personId` on the `consumptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `drinkId` on the `consumptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `drinks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workspaceId` on the `drinks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `people` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workspaceId` on the `people` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `restocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `drinkId` on the `restocks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `workspace_permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workspaceId` on the `workspace_permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `workspace_permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `workspaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ownerId` on the `workspaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "consumptions" DROP CONSTRAINT "consumptions_drinkId_fkey";

-- DropForeignKey
ALTER TABLE "consumptions" DROP CONSTRAINT "consumptions_personId_fkey";

-- DropForeignKey
ALTER TABLE "consumptions" DROP CONSTRAINT "consumptions_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "drinks" DROP CONSTRAINT "drinks_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "restocks" DROP CONSTRAINT "restocks_drinkId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_permissions" DROP CONSTRAINT "workspace_permissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_permissions" DROP CONSTRAINT "workspace_permissions_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_ownerId_fkey";

-- AlterTable
ALTER TABLE "consumptions" DROP CONSTRAINT "consumptions_pkey",
ADD COLUMN     "creatorId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" UUID NOT NULL,
DROP COLUMN "drinkId",
ADD COLUMN     "drinkId" UUID NOT NULL,
ADD CONSTRAINT "consumptions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "drinks" DROP CONSTRAINT "drinks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL,
ADD CONSTRAINT "drinks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "people" DROP CONSTRAINT "people_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL,
ADD CONSTRAINT "people_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "restocks" DROP CONSTRAINT "restocks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "drinkId",
ADD COLUMN     "drinkId" UUID NOT NULL,
ADD CONSTRAINT "restocks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "workspace_permissions" DROP CONSTRAINT "workspace_permissions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "workspace_permissions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" UUID NOT NULL,
ADD CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_name_ownerId_key" ON "workspaces"("name", "ownerId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_permissions" ADD CONSTRAINT "workspace_permissions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_permissions" ADD CONSTRAINT "workspace_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drinks" ADD CONSTRAINT "drinks_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restocks" ADD CONSTRAINT "restocks_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
