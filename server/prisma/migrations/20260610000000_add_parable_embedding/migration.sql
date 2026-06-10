-- Enable pgvector extension (idempotent — safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to Parable table
ALTER TABLE "Parable" ADD COLUMN "embedding" vector(1024);

-- ivfflat index for cosine similarity search
-- lists = 10 because sqrt(~80 parables) ≈ 9, rounded up
-- revisit if parable count grows past 10 000 (use lists = sqrt(n) at that point)
CREATE INDEX ON "Parable" USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
