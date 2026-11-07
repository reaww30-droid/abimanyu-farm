-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "age" INTEGER NOT NULL,
    "milkVolume" REAL NOT NULL DEFAULT 0.0,
    "maleCalves" INTEGER NOT NULL DEFAULT 0,
    "femaleCalves" INTEGER NOT NULL DEFAULT 0,
    "lastCalvingDate" TEXT,
    "reproStatus" TEXT NOT NULL,
    "healthStatus" TEXT NOT NULL,
    "lastVaccineDate" TEXT,
    "vaccineName" TEXT,
    "vet" TEXT,
    "buyPrice" REAL NOT NULL,
    "feedCost" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_tag_key" ON "Animal"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
