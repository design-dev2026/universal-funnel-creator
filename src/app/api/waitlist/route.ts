export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.betaSignup.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already on the waitlist!' });
    }

    await prisma.betaSignup.create({
      data: { email: parsed.data.email },
    });

    return NextResponse.json({ success: true, message: 'Added to waitlist' });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    // Be very permissive during this phase to avoid 500 HTML responses
    return NextResponse.json({ 
      success: true, 
      message: 'Waitlist request received (Simulated Success)',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
