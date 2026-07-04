import type { ReactElement } from 'react';
import { colors } from '@/lib/brand';

export type FontConfig = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
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
    backgroundColor: colors.sageLight, fontFamily: 'Inter',
  },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brandRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  icon: {
    width: '34px', height: '34px', borderRadius: '50%', backgroundColor: colors.sage,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: colors.canvas },
  wordmark: { display: 'flex', fontFamily: 'Inter', fontSize: '18px', fontWeight: 700 },
  domain: { fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: colors.muted },
  content: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', textAlign: 'center', padding: '0 60px',
  },
  stack: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  quote: {
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
    maxWidth: '860px', fontFamily: 'Lora', fontStyle: 'italic', fontSize: '36px',
    lineHeight: 1.45, color: colors.ink,
  },
  author: {
    marginTop: '16px', fontFamily: 'Inter', fontStyle: 'italic', fontSize: '18px', color: colors.sageDark,
  },
  homeTitle: { fontFamily: 'Inter', fontSize: '48px', fontWeight: 700, color: colors.sage },
  homeSlogan: { marginTop: '12px', fontFamily: 'Inter', fontSize: '22px', fontWeight: 500, color: colors.muted },
  footerRow: { display: 'flex', justifyContent: 'flex-end' },
  footerSlogan: { fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, color: colors.sageDark },
  footerDomain: { fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: colors.muted },
} as const;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
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

type OgFontTexts = { interBold: string; interMedium: string; quoteItalic?: string; authorItalic?: string };

async function loadOgFonts(texts: OgFontTexts): Promise<FontConfig[]> {
  const jobs: Promise<FontConfig>[] = [
    loadGoogleFont('Inter', 'wght@700', texts.interBold).then(toFontConfig('Inter', 700, 'normal')),
    loadGoogleFont('Inter', 'wght@500', texts.interMedium).then(toFontConfig('Inter', 500, 'normal')),
  ];
  if (texts.quoteItalic) {
    jobs.push(loadGoogleFont('Lora', 'ital,wght@1,400', texts.quoteItalic).then(toFontConfig('Lora', 400, 'italic')));
  }
  if (texts.authorItalic) {
    jobs.push(loadGoogleFont('Inter', 'ital,wght@1,400', texts.authorItalic).then(toFontConfig('Inter', 400, 'italic')));
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
        <span style={{ color: colors.sage }}>AI</span>
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
    <div style={styles.stack}>
      <div style={styles.quote}>{`“${quote}”`}</div>
      {author && <div style={styles.author}>{`— ${author}`}</div>}
    </div>
  );
}

function HomeHeadline({ slogan }: { slogan: string }) {
  return (
    <div style={styles.stack}>
      <div style={styles.homeTitle}>SagewayAI</div>
      <div style={styles.homeSlogan}>{slogan}</div>
    </div>
  );
}

function Footer({ isDigest, slogan }: { isDigest: boolean; slogan: string }) {
  return (
    <div style={styles.footerRow}>
      <span style={isDigest ? styles.footerSlogan : styles.footerDomain}>
        {isDigest ? slogan : 'sagewayai.com'}
      </span>
    </div>
  );
}

function deriveOgContent(params: OgParams) {
  const { quote, author, lang } = params;
  const isDigest = quote.length > 0;
  const quoteText = truncate(quote, 120);
  const slogan = lang === 'ru' ? 'Мудрость каждый день' : 'Daily Wisdom';
  return { isDigest, quoteText, author, slogan };
}

function renderOgElement(content: ReturnType<typeof deriveOgContent>): ReactElement {
  const { isDigest, quoteText, slogan, author } = content;
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        {isDigest ? <DigestQuote quote={quoteText} author={author} /> : <HomeHeadline slogan={slogan} />}
      </div>
      <Footer isDigest={isDigest} slogan={slogan} />
    </div>
  );
}

export async function buildOgImage(params: OgParams): Promise<{ element: ReactElement; fonts: FontConfig[] }> {
  const content = deriveOgContent(params);
  const fonts = await loadOgFonts({
    interBold: 'SagewayAI',
    interMedium: `sagewayai.com ${content.slogan}`,
    quoteItalic: content.isDigest ? content.quoteText : undefined,
    authorItalic: content.isDigest && content.author ? `— ${content.author}` : undefined,
  });
  return { element: renderOgElement(content), fonts };
}
