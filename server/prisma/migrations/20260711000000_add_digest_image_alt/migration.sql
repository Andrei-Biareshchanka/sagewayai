-- AlterTable: add bilingual alt text for DailyDigest.imageUrl
-- Nullable, no default — falls back to the digest title in code when unset.
ALTER TABLE "DailyDigest" ADD COLUMN "imageAltRu" TEXT;
ALTER TABLE "DailyDigest" ADD COLUMN "imageAltEn" TEXT;
