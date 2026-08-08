// next/image can't derive a blurDataURL for remote images the way it can for
// static imports, so this is a generic shimmer skeleton (not a real blurred
// thumbnail of the actual image) — standard workaround for dynamic/remote
// sources, see https://nextjs.org/docs/app/api-reference/components/image#placeholder

const shimmer = (width: number, height: number) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#EBF5EC" offset="20%" />
      <stop stop-color="#DFF0E1" offset="50%" />
      <stop stop-color="#EBF5EC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#EBF5EC" />
  <rect width="${width}" height="${height}" fill="url(#g)" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const shimmerBlurDataUrl = (width: number, height: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
