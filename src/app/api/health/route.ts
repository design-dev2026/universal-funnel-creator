import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'Simplified health check',
    timestamp: new Date().toISOString(),
  });
}
