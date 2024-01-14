-- CreateTable
CREATE TABLE "WorkTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "monday" BOOLEAN NOT NULL DEFAULT true,
    "tuesday" BOOLEAN NOT NULL DEFAULT true,
    "wednesday" BOOLEAN NOT NULL DEFAULT true,
    "thursday" BOOLEAN NOT NULL DEFAULT true,
    "friday" BOOLEAN NOT NULL DEFAULT true,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "vacation" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "startOfLunch" TEXT NOT NULL,
    "endOfLunch" TEXT NOT NULL,
    "barberId" TEXT NOT NULL,
    CONSTRAINT "WorkTime_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkTime_barberId_key" ON "WorkTime"("barberId");
