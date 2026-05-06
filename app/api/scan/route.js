import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const statsPath = path.join(process.cwd(), 'stats.json');
  const configPath = path.join(process.cwd(), 'config.json');
  
  // Capturar dados do cabeçalho
  const userAgent = request.headers.get('user-agent') || 'Desconhecido';
  const timestamp = new Date().toISOString();
  
  try {
    // Salvar estatísticas
    let stats = { scans: [] };
    try {
      const data = await fs.readFile(statsPath, 'utf-8');
      stats = JSON.parse(data);
    } catch (e) {}

    let device = 'Desktop';
    if (/android/i.test(userAgent)) device = 'Android';
    else if (/iphone|ipad|ipod/i.test(userAgent)) device = 'iOS';

    stats.scans.push({ timestamp, device, userAgent: userAgent.substring(0, 100) });
    await fs.writeFile(statsPath, JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('Erro ao salvar estatísticas:', error);
  }

  // Obter URL de destino dinâmica
  let destination = '/form';
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    destination = config.destinationUrl || '/form';
  } catch (e) {}

  // Redirecionar
  // Se for uma URL absoluta, usar ela diretamente
  if (destination.startsWith('http')) {
    return NextResponse.redirect(new URL(destination));
  }
  
  // Se for relativa, construir a URL completa
  const url = new URL(destination, request.url);
  return NextResponse.redirect(url);
}
