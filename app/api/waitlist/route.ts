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
  // Basic but sufficient pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/*  POST /api/waitlist                                                 */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  try {
    // Reject bodies > 2KB
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 2048) {
      return NextResponse.json(
        { ok: false, error: 'Request too large.' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { email, source, company } = body;

    // Honeypot — silent success, never tell a bot it was caught
    if (company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // Forward to Apps Script
    const userAgent = request.headers.get('user-agent') || '';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: SCRIPT_SECRET,
          type: 'waitlist',
          email,
          source: source || 'hero',
          userAgent,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Apps Script error (waitlist):', res.status, text);
        return NextResponse.json(
          { ok: false, error: 'Something went wrong. Please try again.' },
          { status: 500 },
        );
      }

      const data = await res.json().catch(() => ({}));

      return NextResponse.json({
        ok: true,
        duplicate: data.duplicate === true || false,
      });
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
