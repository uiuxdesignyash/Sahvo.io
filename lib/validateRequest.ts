const SITE_ORIGIN = 'https://sahvo-io.vercel.app';

export function validateRequestShape(
  request: Request,
  maxBodyBytes: number,
): { ok: false; response: Response } | { ok: true } {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return {
      ok: false,
      response: Response.json(
        { ok: false, error: 'Something went wrong.' },
        { status: 400 },
      ),
    };
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > maxBodyBytes) {
    return {
      ok: false,
      response: Response.json(
        { ok: false, error: 'Something went wrong.' },
        { status: 400 },
      ),
    };
  }

  const origin = request.headers.get('origin');
  if (origin && origin !== SITE_ORIGIN) {
    return {
      ok: false,
      response: Response.json({ ok: true }, { status: 200 }),
    };
  }

  const referer = request.headers.get('referer');
  if (referer && !referer.startsWith(SITE_ORIGIN)) {
    return {
      ok: false,
      response: Response.json({ ok: true }, { status: 200 }),
    };
  }

  return { ok: true };
}

export function isHumanDelay(mountedAt: unknown): boolean {
  if (typeof mountedAt !== 'number') return false;
  return Date.now() - mountedAt >= 2000;
}
