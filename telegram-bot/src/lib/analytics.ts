import { prisma } from './prisma';

export type BotEventType =
  | 'start'
  | 'digest_opened'
  | 'situation_used'
  | 'situation_result'
  | 'subscribe'
  | 'unsubscribe'
  | 'language_changed'
  | 'referral';

export function trackEvent(userId: bigint, event: BotEventType, meta?: object): void {
  prisma.botEvent.create({ data: { userId, event, meta } }).catch((err: unknown) => {
    process.stderr.write(`[analytics] trackEvent failed: ${err}\n`);
  });
}
