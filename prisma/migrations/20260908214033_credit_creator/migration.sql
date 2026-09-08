/*
  Warnings:

  - Added the required column `creatorId` to the `credit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credit" ADD COLUMN     "creatorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "credit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
