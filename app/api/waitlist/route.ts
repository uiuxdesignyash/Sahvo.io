import { NextResponse } from 'next/server';

const SCRIPT_URL = process.env.APPS_SCRIPT_URL!;
const SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET!;

/* ------------------------------------------------------------------ */
/*  Rate limiting — max 5 requests per IP per 10 minutes               */
/* ------------------------------------------------------------------ */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Email validation                                                   */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/*  POST /api/waitlist                                                 */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  try {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 2048) {
      return NextResponse.json(
        { ok: false, error: 'Request too large.' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { email, source, company } = body;

    if (company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const userAgent = request.headers.get('user-agent') || '';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          secret: SCRIPT_SECRET,
          type: 'waitlist',
          email,
          source: source || 'hero',
          userAgent,
        }),
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeout);

      const responseText = await res.text().catch(() => '');

      if (res.ok || res.status === 302) {
        let data: any = {};
        try { data = JSON.parse(responseText); } catch { /* not JSON */ }
        return NextResponse.json({
          ok: true,
          duplicate: data.duplicate === true || false,
        });
      }

      console.error('Apps Script error (waitlist):', res.status, responseText.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: 'Something went wrong. Please try again.' },
        { status: 500 },
      );
    } catch (fetchErr: any) {
      clearTimeout(timeout);
      if (fetchErr.name === 'AbortError') {
        console.error('Apps Script timeout (waitlist)');
        return NextResponse.json(
          { ok: false, error: 'Request timed out. Please try again.' },
          { status: 500 },
        );
      }
      throw fetchErr;
    }
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
