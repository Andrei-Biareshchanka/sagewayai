-- CreateTable: BotEvent — telegram-bot analytics events.
-- Table already exists in all environments (created historically via `prisma db push`
-- from telegram-bot). This migration adopts it into server's migration history.
-- It is marked as already-applied in every environment via
-- `prisma migrate resolve --applied 20260718000000_add_bot_event` and MUST NOT
-- be allowed to run its DDL against a database where BotEvent already exists.
-- CreateTable
CREATE TABLE "BotEvent" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "event" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BotEvent_userId_idx" ON "BotEvent"("userId");

-- CreateIndex
CREATE INDEX "BotEvent_event_createdAt_idx" ON "BotEvent"("event", "createdAt");
