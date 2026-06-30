import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DigestPageContent } from './DigestPageContent';

export const revalidate = 86400;

export async function generateStaticParams() {
  const digests = await prisma.dailyDigest.findMany({
    select: { slug: true },
    where: { slug: { not: null } },
    orderBy: { date: 'desc' },
  });
  return digests.map((d) => ({ slug: d.slug as string }));
}

async function getDigestBySlug(slug: string) {
  return prisma.dailyDigest.findUnique({
    where: { slug },
    include: {
      quote: true,
      parable: { include: { category: true } },
    },
  });
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const digest = await getDigestBySlug(slug);
  if (!digest) return {};

  const title =
    digest.titleRu ?? digest.titleEn ?? digest.parable.titleRu ?? digest.parable.title;
  const quoteSnippet = (digest.quote.textRu ?? digest.quote.text).slice(0, 80);
  const moral = digest.parable.moralRu ?? digest.parable.moral;
  const description = `«${quoteSnippet}» — ${moral}`.slice(0, 160);

  return {
    title: `${title} | SagewayAI`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: digest.date.toISOString(),
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://sagewayai.com/d/${slug}`,
    },
  };
}

export default async function DigestPage({ params }: PageProps) {
  const { slug } = await params;
  const digest = await getDigestBySlug(slug);
  if (!digest) notFound();

  const related = await prisma.dailyDigest.findMany({
    where: { slug: { not: slug } },
    select: {
      date: true,
      slug: true,
      parable: { select: { title: true, titleRu: true } },
    },
    orderBy: { date: 'desc' },
    take: 3,
  });

  const parableTitle = digest.parable.titleRu ?? digest.parable.title;
  const description = (digest.parable.contentRu ?? digest.parable.content).slice(0, 160);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: parableTitle,
    description,
    datePublished: digest.date.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'SagewayAI',
      url: 'https://sagewayai.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1 max-w-[680px] mx-auto px-4 sm:px-6 py-12">
        <DigestPageContent
          digest={{
            date: digest.date,
            quote: {
              textRu: digest.quote.textRu ?? digest.quote.text,
              textEn: digest.quote.text,
              authorRu: digest.quote.authorRu ?? digest.quote.author,
              authorEn: digest.quote.author,
            },
            parable: {
              titleRu: digest.parable.titleRu ?? digest.parable.title,
              titleEn: digest.parable.title,
              contentRu: digest.parable.contentRu ?? digest.parable.content,
              contentEn: digest.parable.content,
            },
            conclusionRu: digest.conclusionRu,
            conclusionEn: digest.conclusionEn,
            questionRu: digest.questionRu,
            questionEn: digest.questionEn,
          }}
          related={related.map((d) => ({
            date: d.date,
            parableTitleRu: d.parable.titleRu ?? d.parable.title,
            parableTitleEn: d.parable.title,
            slug: d.slug as string,
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
