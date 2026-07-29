import { mkdir, readFile, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, question, honeypot } = body;

    // Honeypot bot protection
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Server-side validation
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please enter your question.' },
        { status: 400 },
      );
    }

    // Append to local queries JSON file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'faq-queries.json');

    await mkdir(dataDir, { recursive: true });

    let queries: Array<{ name: string; email: string; question: string; timestamp: string }> = [];
    try {
      const fileData = await readFile(filePath, 'utf-8');
      queries = JSON.parse(fileData);
    } catch {
      queries = [];
    }

    queries.push({
      name: name || '',
      email,
      question: question.trim(),
      timestamp: new Date().toISOString(),
    });

    await writeFile(filePath, JSON.stringify(queries, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FAQ Query API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 },
    );
  }
}
