import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET;

/* ------------------------------------------------------------------ */
/*  Rate limiting — max 3 requests per IP per 15 minutes               */
/* ------------------------------------------------------------------ */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

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
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/*  POST /api/query                                                    */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  try {
    if (!SCRIPT_URL || !SCRIPT_SECRET) {
      console.error('[query] Missing env vars:', { url: !!SCRIPT_URL, secret: !!SCRIPT_SECRET });
      return NextResponse.json(
        { ok: false, error: 'Server configuration error.' },
        { status: 500 },
      );
    }

    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 8192) {
      return NextResponse.json(
        { ok: false, error: 'Request too large.' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, email, question, company } = body;

    if (company) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Please enter your question.' },
        { status: 400 },
      );
    }

    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length < 10) {
      return NextResponse.json(
        { ok: false, error: 'Question must be at least 10 characters.' },
        { status: 400 },
      );
    }
    if (trimmedQuestion.length > 2000) {
      return NextResponse.json(
        { ok: false, error: 'Question must be under 2000 characters.' },
        { status: 400 },
      );
    }

    const trimmedName = name ? String(name).trim().slice(0, 100) : '';

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
          type: 'query',
          name: trimmedName,
          email,
          question: trimmedQuestion,
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

      console.error('[query] Apps Script error:', res.status, res.statusText, responseText.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: 'Something went wrong. Please try again.' },
        { status: 500 },
      );
    } catch (fetchErr: any) {
      clearTimeout(timeout);
      if (fetchErr.name === 'AbortError') {
        console.error('[query] Apps Script timeout after 60s');
        return NextResponse.json(
          { ok: false, error: 'Request timed out. Please try again.' },
          { status: 500 },
        );
      }
      console.error('[query] Fetch failed:', fetchErr?.message, fetchErr?.code);
      throw fetchErr;
    }
  } catch (error: any) {
    console.error('[query] Unhandled error:', error?.message, error?.stack);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
