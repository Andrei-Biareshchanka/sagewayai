-- CreateTable
CREATE TABLE "Parable" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "moral" TEXT NOT NULL,
    "source" TEXT,
    "readTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Parable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "parablesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyParable" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "parableId" TEXT NOT NULL,

    CONSTRAINT "DailyParable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Parable_categoryId_idx" ON "Parable"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DailyParable_date_key" ON "DailyParable"("date");

-- AddForeignKey
ALTER TABLE "Parable" ADD CONSTRAINT "Parable_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyParable" ADD CONSTRAINT "DailyParable_parableId_fkey" FOREIGN KEY ("parableId") REFERENCES "Parable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
