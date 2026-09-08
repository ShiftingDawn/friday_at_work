-- CreateTable
CREATE TABLE "credit" (
    "id" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "credit_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
