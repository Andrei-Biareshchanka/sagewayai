-- AlterTable: add publish-workflow fields to DailyDigest
ALTER TABLE "DailyDigest" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "DailyDigest" ADD COLUMN "publishedAt" TIMESTAMP(3);

-- Backfill: every digest that existed before this migration was already publicly live
UPDATE "DailyDigest" SET "isPublished" = true, "publishedAt" = "createdAt";
