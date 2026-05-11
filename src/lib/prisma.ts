import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Phase check to avoid DB connection during build
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
const hasDbUrl = Boolean(process.env.DATABASE_URL);

if (!hasDbUrl && !isBuildPhase && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ DATABASE_URL is not set. Database operations will fail.');
}

export const prisma = (isBuildPhase || !hasDbUrl)
  ? ({} as any) // Mock object for build/missing-env
  : (globalForPrisma.prisma ?? new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

