-- AlterTable: add optional image URL to DailyDigest
-- Nullable and no default — existing digests without an image keep working unchanged.
ALTER TABLE "DailyDigest" ADD COLUMN "imageUrl" TEXT;
