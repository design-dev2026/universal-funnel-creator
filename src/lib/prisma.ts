import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = (process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL)
  ? ({} as any)
  : (globalForPrisma.prisma ?? new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
