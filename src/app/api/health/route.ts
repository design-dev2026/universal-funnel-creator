import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'Simplified health check',
    timestamp: new Date().toISOString(),
  });
}
