-- DropIndex
-- This constraint assumed the old quote-first pipeline, where a parable+quote
-- pairing could only ever happen once. The new parable-first pipeline
-- (selectDailyParable + findQuoteForParable) intentionally rotates a
-- parable back through the same 3 quotes every 3rd show, which would violate
-- this constraint in production once the rotation completes a full cycle.
DROP INDEX "DailyDigest_parableId_quoteId_key";
