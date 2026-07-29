import { mkdir, readFile, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source, honeypot } = body;

    // Honeypot bot protection (FRM-08)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "You're on the list." }, { status: 200 });
    }

    // Server-side validation (FRM-03)
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, message: "That doesn't look like an email address. Mind checking it?" },
        { status: 400 }
      );
    }

    // Append to local subscribers JSON file (OPN-02 temporary storage)
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'subscribers.json');

    await mkdir(dataDir, { recursive: true });

    let subscribers: Array<{ email: string; source: string; timestamp: string }> = [];
    try {
      const fileData = await readFile(filePath, 'utf-8');
      subscribers = JSON.parse(fileData);
    } catch {
      subscribers = [];
    }

    subscribers.push({
      email,
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
    });

    await writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf-8');

    // Duplicate submissions return success (FRM-10)
    return NextResponse.json({
      success: true,
      message: "You're on the list. We'll write when there's something real to show you.",
    });
  } catch (error) {
    console.error('Subscription API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
