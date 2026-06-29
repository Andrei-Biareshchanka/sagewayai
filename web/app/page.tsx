import type { Metadata } from 'next';
import { startOfDay } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomeDailyDigest } from '@/components/HomeDailyDigest';
import { CTABlock } from '@/components/CTABlock';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'SagewayAI — мудрость каждый день',
  description: 'Дайджест дня: цитата, притча, рефлексия и вопрос для размышления. Найдите мудрость для вашей ситуации.',
  alternates: {
    canonical: 'https://sagewayai.com',
  },
  openGraph: {
    title: 'SagewayAI — мудрость каждый день',
    description: 'Дайджест дня: цитата, притча, рефлексия и вопрос для размышления.',
    url: 'https://sagewayai.com',
    images: [
      {
        url: '/api/og?title=SagewayAI&lang=ru',
        width: 1200,
        height: 630,
      },
    ],
  },
};

async function getDailyDigest() {
  const today = startOfDay(new Date());
  const digest = await prisma.dailyDigest.findFirst({
    where: { date: { gte: today } },
    orderBy: { date: 'desc' },
    include: { quote: true, parable: true },
  });
  if (digest) return digest;
  return prisma.dailyDigest.findFirst({
    orderBy: { date: 'desc' },
    include: { quote: true, parable: true },
  });
}

export default async function HomePage() {
  const digest = await getDailyDigest();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-[680px] mx-auto px-4 sm:px-6 py-12 space-y-12">
        {digest && (
          <HomeDailyDigest
            data={{
              quote: {
                textRu: digest.quote.textRu ?? digest.quote.text,
                authorRu: digest.quote.authorRu ?? digest.quote.author,
                textEn: digest.quote.text,
                authorEn: digest.quote.author,
              },
              parable: {
                titleRu: digest.parable.titleRu ?? digest.parable.title,
                contentRu: digest.parable.contentRu ?? digest.parable.content,
                titleEn: digest.parable.title,
                contentEn: digest.parable.content,
              },
              conclusionRu: digest.conclusionRu,
              conclusionEn: digest.conclusionEn,
              questionRu: digest.questionRu,
              questionEn: digest.questionEn,
            }}
            slug={generateSlug(digest.parable.title)}
          />
        )}

        <CTABlock />
      </main>
      <Footer />
    </>
  );
}
