import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    let dbStatus = 'unknown';
    try {
      // The proxy will handle the lazy initialization
      await (prisma as any).$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (e) {
      console.error('Health check DB error:', e);
      dbStatus = 'disconnected';
    }

    return NextResponse.json({
      status: 'healthy',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ status: 'unhealthy', error: String(error) }, { status: 500 });
  }
}
