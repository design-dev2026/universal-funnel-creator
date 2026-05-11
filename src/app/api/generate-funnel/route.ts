import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateFunnel } from '@/lib/engine/ruleEngine';

const inputSchema = z.object({
  productDetails: z.record(z.string(), z.unknown()).nullable(),
  audienceProfile: z.record(z.string(), z.unknown()).nullable(),
  goal: z.string().nullable(),
  budget: z.number().nullable(),
  assets: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const parsed = inputSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Call the rule engine (mocked for now)
    const blueprint = generateFunnel(parsed.data);

    // In a real app, we might save the generated blueprint to the DB here
    
    // Return the blueprint
    return NextResponse.json({ blueprint });
    
  } catch (error) {
    console.error('Error generating funnel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
