import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Inter, Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SITE_URL } from '@/lib/config';
import { LOCALES, isLocale, type Locale } from '@/lib/locales';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale: Locale = isLocale(locale) ? locale : 'ru';

  return {
    title: 'SagewayAI — мудрость каждый день',
    description:
      'Дайджест дня: цитата, притча, рефлексия и вопрос для размышления. Найдите мудрость для вашей ситуации.',
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      siteName: 'SagewayAI',
      type: 'website',
      locale: resolvedLocale === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: '/web-app-manifest-512x512.png', width: 512, height: 512 }],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${inter.variable} ${lora.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <LanguageProvider lang={locale}>
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </Suspense>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
