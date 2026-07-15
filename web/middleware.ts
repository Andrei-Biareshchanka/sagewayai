import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/config';

// The Vercel-assigned production alias serves the exact same content as the
// canonical domain — Google indexed both, causing duplicate-content warnings.
// Scoped to this one host only, not `*.vercel.app` broadly, so PR preview
// deployments (e.g. sagewayai-git-<branch>.vercel.app) stay directly viewable for QA.
const DUPLICATE_HOST = 'sagewayai.vercel.app';

export function middleware(request: NextRequest) {
  if (request.headers.get('host') === DUPLICATE_HOST) {
    const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE_URL);
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
