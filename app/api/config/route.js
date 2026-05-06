import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const configPath = path.join(process.cwd(), 'config.json');
  try {
    const data = await fs.readFile(configPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json({ destinationUrl: '/form' });
  }
}

export async function POST(request) {
  const configPath = path.join(process.cwd(), 'config.json');
  try {
    const body = await request.json();
    await fs.writeFile(configPath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
