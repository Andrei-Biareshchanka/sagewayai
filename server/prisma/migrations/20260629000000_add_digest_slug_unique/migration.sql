-- Add nullable slug field to DailyDigest
ALTER TABLE "DailyDigest" ADD COLUMN "slug" TEXT;

-- Unique index on slug (allows NULL, but no two non-null values can match)
CREATE UNIQUE INDEX "DailyDigest_slug_key" ON "DailyDigest"("slug");

-- Prevent exact content duplicates: same parable + same quote can only appear once
CREATE UNIQUE INDEX "DailyDigest_parableId_quoteId_key" ON "DailyDigest"("parableId", "quoteId");
