-- CreateTable
CREATE TABLE "DailyDigest" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "quoteId" TEXT NOT NULL,
    "parableId" TEXT NOT NULL,
    "conclusionEn" TEXT NOT NULL,
    "conclusionRu" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "questionRu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyDigest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyDigest_date_key" ON "DailyDigest"("date");

-- AddForeignKey
ALTER TABLE "DailyDigest" ADD CONSTRAINT "DailyDigest_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyDigest" ADD CONSTRAINT "DailyDigest_parableId_fkey" FOREIGN KEY ("parableId") REFERENCES "Parable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
