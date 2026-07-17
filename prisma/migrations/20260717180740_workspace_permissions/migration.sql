-- CreateTable
CREATE TABLE "workspace_permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "permission" TEXT NOT NULL DEFAULT 'READ',
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "workspace_permissions_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workspace_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
