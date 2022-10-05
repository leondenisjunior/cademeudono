/*
  Warnings:

  - You are about to drop the `Adopt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adopt" DROP CONSTRAINT "Adopt_petId_fkey";

-- DropForeignKey
ALTER TABLE "Adopt" DROP CONSTRAINT "Adopt_userId_fkey";

-- DropTable
DROP TABLE "Adopt";

-- DropTable
DROP TABLE "Pet";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "images" JSONB NOT NULL,
    "specie" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adopt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adopt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "adoptId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adopt" ADD CONSTRAINT "adopt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adopt" ADD CONSTRAINT "adopt_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_adoptId_fkey" FOREIGN KEY ("adoptId") REFERENCES "adopt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
