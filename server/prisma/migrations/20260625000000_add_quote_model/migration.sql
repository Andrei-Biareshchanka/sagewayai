-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "textRu" TEXT,
    "author" TEXT NOT NULL,
    "authorRu" TEXT,
    "theme" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" vector(1024),

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quote_text_author_key" ON "Quote"("text", "author");

-- ivfflat index for cosine similarity search
-- lists = 10, matches the Parable embedding index — revisit if quote count grows past 10 000
CREATE INDEX ON "Quote" USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
