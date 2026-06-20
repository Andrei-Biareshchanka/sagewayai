-- CreateTable
CREATE TABLE "TelegramSubscriber" (
    "id" TEXT NOT NULL,
    "chatId" BIGINT NOT NULL,
    "username" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramSubscriber_chatId_key" ON "TelegramSubscriber"("chatId");
