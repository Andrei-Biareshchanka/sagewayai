-- CreateTable
CREATE TABLE "Situation" (
    "id" TEXT NOT NULL,
    "slugRu" TEXT NOT NULL,
    "slugEn" TEXT NOT NULL,
    "h1Ru" TEXT NOT NULL,
    "h1En" TEXT NOT NULL,
    "introRu" TEXT NOT NULL,
    "introEn" TEXT NOT NULL,
    "metaDescriptionRu" TEXT NOT NULL,
    "metaDescriptionEn" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Situation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SituationParable" (
    "id" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "parableId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "noteRu" TEXT,
    "noteEn" TEXT,

    CONSTRAINT "SituationParable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Situation_slugRu_key" ON "Situation"("slugRu");

-- CreateIndex
CREATE UNIQUE INDEX "Situation_slugEn_key" ON "Situation"("slugEn");

-- CreateIndex
CREATE INDEX "SituationParable_parableId_idx" ON "SituationParable"("parableId");

-- CreateIndex
CREATE UNIQUE INDEX "SituationParable_situationId_position_key" ON "SituationParable"("situationId", "position");

-- AddForeignKey
ALTER TABLE "SituationParable" ADD CONSTRAINT "SituationParable_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SituationParable" ADD CONSTRAINT "SituationParable_parableId_fkey" FOREIGN KEY ("parableId") REFERENCES "Parable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
