import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const statsPath = path.join(process.cwd(), 'stats.json');
  try {
    const data = await fs.readFile(statsPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json({ scans: [] });
  }
}
