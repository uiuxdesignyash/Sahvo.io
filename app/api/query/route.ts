import { NextResponse } from 'next/server';

const SCRIPT_URL = process.env.APPS_SCRIPT_URL!;
const SCRIPT_SECRET = process.env.APPS_SCRIPT_SECRET!;

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
    // Reject bodies > 8KB
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 8192) {
      return NextResponse.json(
        { ok: false, error: 'Request too large.' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, email, question, company } = body;

    // Honeypot — silent success
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

    // Validate question
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

    // Validate name (optional, max 100)
    const trimmedName = name ? String(name).trim().slice(0, 100) : '';

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
          type: 'query',
          name: trimmedName,
          email,
          question: trimmedQuestion,
          userAgent,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Apps Script error (query):', res.status, text);
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
        console.error('Apps Script timeout (query)');
        return NextResponse.json(
          { ok: false, error: 'Request timed out. Please try again.' },
          { status: 500 },
        );
      }
      throw fetchErr;
    }
  } catch (error) {
    console.error('Query API Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
