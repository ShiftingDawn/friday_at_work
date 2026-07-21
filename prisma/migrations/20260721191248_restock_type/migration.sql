-- CreateEnum
CREATE TYPE "RestockType" AS ENUM ('RESTOCK', 'CORRECTION');

-- AlterTable
ALTER TABLE "restocks" ADD COLUMN     "type" "RestockType" NOT NULL DEFAULT 'RESTOCK';
