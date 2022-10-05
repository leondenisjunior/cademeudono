/*
  Warnings:

  - Added the required column `userId` to the `Adopt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adopt" DROP CONSTRAINT "Adopt_petId_fkey";

-- AlterTable
ALTER TABLE "Adopt" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Adopt" ADD CONSTRAINT "Adopt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopt" ADD CONSTRAINT "Adopt_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
