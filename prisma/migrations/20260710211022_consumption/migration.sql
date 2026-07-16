-- CreateTable
CREATE TABLE "consumptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "drinkId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "consumptions_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consumptions_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
