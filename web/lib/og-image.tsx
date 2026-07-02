import type { ReactElement } from 'react';
import { colors } from '@/lib/brand';

export type FontConfig = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 700;
  style: 'normal' | 'italic';
};

export type OgParams = {
  title: string;
  quote: string;
  author: string;
  lang: 'ru' | 'en';
};

const styles = {
  container: {
    width: '1200px', height: '630px', display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between', padding: '60px', boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)', fontFamily: 'Inter',
  },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  icon: {
    width: '40px', height: '40px', borderRadius: '999px', backgroundColor: colors.sage,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: '20px', fontWeight: 700, color: colors.canvas },
  wordmark: { display: 'flex', fontSize: '26px', fontWeight: 700 },
  domain: { fontSize: '18px', color: 'rgba(255,255,255,0.5)' },
  content: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', textAlign: 'center', padding: '0 40px',
  },
  quote: {
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
    maxWidth: '950px', fontFamily: 'Lora', fontWeight: 600, fontSize: '36px', lineHeight: 1.4, color: '#FFFFFF',
  },
  author: {
    marginTop: '28px', fontFamily: 'Lora', fontStyle: 'italic', fontWeight: 400, fontSize: '22px', color: '#a8c5a0',
  },
  homeTitle: { fontSize: '72px', fontWeight: 700, color: '#FFFFFF' },
  tagline: { marginTop: '20px', fontSize: '26px', fontWeight: 400, color: 'rgba(255,255,255,0.75)' },
  footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerTitle: {
    fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.55)',
    maxWidth: '700px', overflow: 'hidden', whiteSpace: 'nowrap',
  },
  badge: {
    display: 'flex', padding: '10px 20px', borderRadius: '999px',
    backgroundColor: 'rgba(92,158,101,0.18)', border: '1px solid rgba(92,158,101,0.4)',
  },
  badgeText: { fontSize: '15px', fontWeight: 700, color: '#a8c5a0' },
} as const;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}...`;
}

async function loadGoogleFont(family: string, axis: string, text: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:${axis}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then((res) => res.text());
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error(`Failed to resolve font source for ${family}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

function toFontConfig(name: string, weight: FontConfig['weight'], style: FontConfig['style']) {
  return (data: ArrayBuffer): FontConfig => ({ name, data, weight, style });
}

async function loadOgFonts(texts: {
  interBold: string;
  interRegular: string;
  quote?: string;
  author?: string;
}): Promise<FontConfig[]> {
  const jobs: Promise<FontConfig>[] = [
    loadGoogleFont('Inter', 'wght@700', texts.interBold).then(toFontConfig('Inter', 700, 'normal')),
    loadGoogleFont('Inter', 'wght@400', texts.interRegular).then(toFontConfig('Inter', 400, 'normal')),
  ];
  if (texts.quote) {
    jobs.push(loadGoogleFont('Lora', 'wght@600', texts.quote).then(toFontConfig('Lora', 600, 'normal')));
  }
  if (texts.author) {
    jobs.push(loadGoogleFont('Lora', 'ital,wght@1,400', texts.author).then(toFontConfig('Lora', 400, 'italic')));
  }
  return Promise.all(jobs);
}

function Brand() {
  return (
    <div style={styles.brandRow}>
      <div style={styles.icon}>
        <span style={styles.iconText}>S</span>
      </div>
      <div style={styles.wordmark}>
        <span style={{ color: colors.sage }}>Sage</span>
        <span style={{ color: colors.amber }}>way</span>
        <span style={{ color: colors.sageMuted }}>AI</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={styles.headerRow}>
      <Brand />
      <span style={styles.domain}>sagewayai.com</span>
    </div>
  );
}

function DigestQuote({ quote, author }: { quote: string; author: string }) {
  return (
    <>
      <div style={styles.quote}>{`“${quote}”`}</div>
      {author && <div style={styles.author}>{`— ${author}`}</div>}
    </>
  );
}

function HomeHeadline({ tagline }: { tagline: string }) {
  return (
    <>
      <div style={styles.homeTitle}>SagewayAI</div>
      <div style={styles.tagline}>{tagline}</div>
    </>
  );
}

function Footer({
  isDigest,
  bottomTitle,
  badgeText,
}: {
  isDigest: boolean;
  bottomTitle: string;
  badgeText: string;
}) {
  return (
    <div style={styles.footerRow}>
      <span style={styles.footerTitle}>{isDigest ? bottomTitle : 'sagewayai.com'}</span>
      <div style={styles.badge}>
        <span style={styles.badgeText}>{badgeText}</span>
      </div>
    </div>
  );
}

function deriveOgContent(params: OgParams) {
  const { title, quote, author, lang } = params;
  const isDigest = quote.length > 0;
  const quoteText = truncate(quote, 200);
  const bottomTitle = truncate(title, 70);
  const subtitle = lang === 'ru' ? 'Мудрость дня' : 'Daily Wisdom';
  const tagline =
    lang === 'ru'
      ? 'Мудрость каждый день — притчи, цитаты, рефлексия'
      : 'Daily wisdom — parables, quotes, reflection';
  const badgeText = isDigest ? subtitle : 'SagewayAI';
  return { isDigest, quoteText, bottomTitle, tagline, badgeText, author };
}

function renderOgElement(content: ReturnType<typeof deriveOgContent>): ReactElement {
  const { isDigest, quoteText, bottomTitle, tagline, badgeText, author } = content;
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        {isDigest ? <DigestQuote quote={quoteText} author={author} /> : <HomeHeadline tagline={tagline} />}
      </div>
      <Footer isDigest={isDigest} bottomTitle={bottomTitle} badgeText={badgeText} />
    </div>
  );
}

export async function buildOgImage(params: OgParams): Promise<{ element: ReactElement; fonts: FontConfig[] }> {
  const content = deriveOgContent(params);
  const fonts = await loadOgFonts({
    interBold: `SagewayAI ${content.badgeText} S`,
    interRegular: `sagewayai.com ${content.tagline} ${content.bottomTitle}`,
    quote: content.isDigest ? content.quoteText : undefined,
    author: content.isDigest && content.author ? `— ${content.author}` : undefined,
  });
  return { element: renderOgElement(content), fonts };
}
