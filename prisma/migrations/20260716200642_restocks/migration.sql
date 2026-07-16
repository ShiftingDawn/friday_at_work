-- CreateTable
CREATE TABLE "restocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drinkId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "restocks_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drinks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineIndex
DROP INDEX "User_username_key";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- RedefineIndex
DROP INDEX "Workspace_name_ownerId_key";
CREATE UNIQUE INDEX "workspaces_name_ownerId_key" ON "workspaces"("name", "ownerId");
