/*
  Warnings:

  - Added the required column `creatorId` to the `restocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restocks" ADD COLUMN     "creatorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "restocks" ADD CONSTRAINT "restocks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
