import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/slug';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DigestPageContent } from './DigestPageContent';

export const revalidate = 86400;

async function getAllDigests() {
  return prisma.dailyDigest.findMany({
    include: { parable: true },
    orderBy: { date: 'desc' },
  });
}

export async function generateStaticParams() {
  const digests = await getAllDigests();
  return digests.map((d) => ({ slug: generateSlug(d.parable.title) }));
}

async function getDigestBySlug(slug: string) {
  const digests = await prisma.dailyDigest.findMany({
    include: {
      quote: true,
      parable: { include: { category: true } },
    },
    orderBy: { date: 'desc' },
  });
  return digests.find((d) => generateSlug(d.parable.title) === slug) ?? null;
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const digest = await getDigestBySlug(slug);
  if (!digest) return {};

  const title = digest.parable.titleRu ?? digest.parable.title;
  const description = (digest.parable.contentRu ?? digest.parable.content).slice(0, 160);

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

  const allDigests = await getAllDigests();
  const related = allDigests
    .filter((d) => generateSlug(d.parable.title) !== slug)
    .slice(0, 3)
    .map((d) => ({
      date: d.date,
      parableTitleRu: d.parable.titleRu ?? d.parable.title,
      parableTitleEn: d.parable.title,
      slug: generateSlug(d.parable.title),
    }));

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
          related={related}
        />
      </main>
      <Footer />
    </>
  );
}
