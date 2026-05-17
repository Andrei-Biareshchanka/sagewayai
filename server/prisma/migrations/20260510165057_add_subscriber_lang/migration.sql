/*
  Warnings:

  - Added the required column `updatedAt` to the `EmailSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailSubscriber" ADD COLUMN     "lang" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "EmailSubscriber" ALTER COLUMN "updatedAt" DROP DEFAULT;
