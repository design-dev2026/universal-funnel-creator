import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Simple check to see if we can talk to the DB
    // Using a try-catch because prisma might be a mock during build
    let dbStatus = 'unknown';
    try {
      // Smallest possible query
      await (prisma as any).$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (e) {
      dbStatus = 'disconnected';
    }

    return NextResponse.json({
      status: 'healthy',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json({ status: 'unhealthy', error: String(error) }, { status: 500 });
  }
}
