export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    url: process.env.APPS_SCRIPT_URL ? 'set' : 'MISSING',
    secret: process.env.APPS_SCRIPT_SECRET ? 'set' : 'MISSING',
    urlLength: process.env.APPS_SCRIPT_URL?.length ?? 0,
  });
}
