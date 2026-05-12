import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma Client Singleton for Prisma 7.8.0+
 * 
 * In Prisma 7, direct connections without Accelerate require an explicit 
 * driver adapter. We use @prisma/adapter-pg to connect to PostgreSQL.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL;

  // Build-phase guard: Return a mock if the URL is missing during static generation
  if (!url && process.env.NEXT_PHASE === 'phase-production-build') {
    return {} as PrismaClient;
  }

  if (!url) {
    console.warn('DATABASE_URL is missing. Prisma Client may fail to connect.');
  }

  // Set up the PostgreSQL driver adapter
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
