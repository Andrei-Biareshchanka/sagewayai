import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.SAGEWAYAI_API_URL ?? 'http://localhost:3001';

export async function POST(request: NextRequest) {
  const userIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/api/digest/situation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': userIp,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
  }
}
