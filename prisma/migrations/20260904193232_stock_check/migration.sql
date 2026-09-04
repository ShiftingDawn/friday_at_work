-- CreateTable
CREATE TABLE "stock_check" (
    "id" UUID NOT NULL,
    "drinkId" UUID NOT NULL,
    "creatorId" UUID NOT NULL,
    "restockId" UUID,
    "expected" INTEGER NOT NULL,
    "actual" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_check_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_check" ADD CONSTRAINT "stock_check_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_check" ADD CONSTRAINT "stock_check_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_check" ADD CONSTRAINT "stock_check_restockId_fkey" FOREIGN KEY ("restockId") REFERENCES "restocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
