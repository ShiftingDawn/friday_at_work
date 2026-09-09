-- CreateTable
CREATE TABLE "receipt" (
    "id" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "creatorId" UUID NOT NULL,
    "from" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "to" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_history" (
    "receiptId" UUID NOT NULL,
    "consumptionId" UUID NOT NULL,

    CONSTRAINT "receipt_history_pkey" PRIMARY KEY ("receiptId","consumptionId")
);

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_history" ADD CONSTRAINT "receipt_history_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_history" ADD CONSTRAINT "receipt_history_consumptionId_fkey" FOREIGN KEY ("consumptionId") REFERENCES "consumptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
