-- Prevent duplicate parable+quote pairings in DailyDigest
CREATE UNIQUE INDEX "DailyDigest_parableId_quoteId_key" ON "DailyDigest"("parableId", "quoteId");
