-- CreateEnum
CREATE TYPE "ReflectionStatus" AS ENUM ('DRAFT', 'GENERATED', 'REVIEWED', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Parable" ADD COLUMN     "conclusionEn" TEXT,
ADD COLUMN     "conclusionRu" TEXT,
ADD COLUMN     "imageAltEn" TEXT,
ADD COLUMN     "imageAltRu" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "questionsEn" JSONB,
ADD COLUMN     "questionsRu" JSONB,
ADD COLUMN     "reflectionStatus" "ReflectionStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "reflectionUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "slugEn" TEXT,
ADD COLUMN     "slugRu" TEXT;

-- CreateTable
CREATE TABLE "ParableQuote" (
    "id" TEXT NOT NULL,
    "parableId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ParableQuote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParableQuote_quoteId_idx" ON "ParableQuote"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "ParableQuote_parableId_position_key" ON "ParableQuote"("parableId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Parable_slugRu_key" ON "Parable"("slugRu");

-- CreateIndex
CREATE UNIQUE INDEX "Parable_slugEn_key" ON "Parable"("slugEn");

-- AddForeignKey
ALTER TABLE "ParableQuote" ADD CONSTRAINT "ParableQuote_parableId_fkey" FOREIGN KEY ("parableId") REFERENCES "Parable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParableQuote" ADD CONSTRAINT "ParableQuote_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
