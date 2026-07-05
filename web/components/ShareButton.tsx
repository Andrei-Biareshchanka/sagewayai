'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
}

function trackShare(method: string) {
  window.gtag?.('event', 'share', { method, content_type: 'digest' });
}

async function shareViaWebShareApi(title: string, text: string, url: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) return false;
  try {
    await navigator.share({ title, text, url });
    trackShare('web_share_api');
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return true;
    console.error('navigator.share failed', error);
  }
  return true;
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.286c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.935z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2.003c-5.514 0-9.998 4.483-9.998 9.997 0 1.762.462 3.484 1.34 5.003l-1.423 5.194 5.318-1.394a9.96 9.96 0 0 0 4.763 1.213h.004c5.513 0 9.996-4.483 9.996-9.997 0-2.671-1.04-5.183-2.929-7.071a9.93 9.93 0 0 0-7.071-2.945zm0 18.163h-.003a8.15 8.15 0 0 1-4.157-1.139l-.298-.177-3.156.828.842-3.078-.194-.315a8.13 8.13 0 0 1-1.246-4.335c0-4.508 3.667-8.174 8.176-8.174a8.13 8.13 0 0 1 5.783 2.398 8.13 8.13 0 0 1 2.394 5.785c0 4.508-3.667 8.107-8.141 8.107z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function ShareButton({ url, title, text }: ShareButtonProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  async function handleShareClick() {
    const shared = await shareViaWebShareApi(title, text, url);
    if (!shared) setOpen((v) => !v);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(url);
    trackShare('copy_link');
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleLinkClick(method: string) {
    trackShare(method);
    setOpen(false);
  }

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={handleShareClick}
        className="flex items-center gap-2 font-sans text-sm font-medium text-sage-dark bg-sage-light hover:bg-sage-pill-hover rounded-full px-4 py-2 transition-colors"
      >
        <ShareIcon />
        {copied ? (lang === 'ru' ? 'Скопировано!' : 'Copied!') : lang === 'ru' ? 'Поделиться' : 'Share'}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-canvas shadow-sm">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('telegram')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-sage-light transition-colors"
          >
            <TelegramIcon /> Telegram
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('whatsapp')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-sage-light transition-colors"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('x')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-sage-light transition-colors"
          >
            <XIcon /> X
          </a>
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-ink hover:bg-sage-light transition-colors"
          >
            <LinkIcon /> {lang === 'ru' ? 'Скопировать ссылку' : 'Copy link'}
          </button>
        </div>
      )}
    </div>
  );
}
