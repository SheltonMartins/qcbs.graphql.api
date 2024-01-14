-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "usersId" TEXT,
    "barberId" TEXT,
    CONSTRAINT "Tokens_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tokens_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tokens" ("barberId", "id", "token", "usersId") SELECT "barberId", "id", "token", "usersId" FROM "Tokens";
DROP TABLE "Tokens";
ALTER TABLE "new_Tokens" RENAME TO "Tokens";
CREATE UNIQUE INDEX "Tokens_token_key" ON "Tokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
