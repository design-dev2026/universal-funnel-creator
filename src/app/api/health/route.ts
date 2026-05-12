import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    let dbStatus = 'unknown';
    let errorMessage = null;

    try {
      // Active verification of the database connection
      await (prisma as any).$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (e: any) {
      console.error('Health check database verification failed:', e);
      dbStatus = 'disconnected';
      errorMessage = e.message || String(e);
    }

    return NextResponse.json({
      status: 'healthy',
      database: dbStatus,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      phase: process.env.NEXT_PHASE || 'runtime'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'unhealthy', 
      error: error.message || String(error) 
    }, { status: 500 });
  }
}
