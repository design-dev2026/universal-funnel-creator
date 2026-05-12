import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * We use a Proxy to ensure that the PrismaClient is only instantiated at runtime.
 * This prevents build-time crashes when DATABASE_URL might be missing.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (prop === 'then') return undefined;

    if (!globalForPrisma.prisma) {
      const url = process.env.DATABASE_URL;
      
      // Build-phase guard
      if (!url && process.env.NEXT_PHASE === 'phase-production-build') {
        return (target as any)[prop];
      }

      try {
        globalForPrisma.prisma = new PrismaClient({
          // Explicitly pass the URL to ensure it takes precedence and handles
          // various production environments correctly.
          datasources: {
            db: {
              url: url
            }
          },
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });
      } catch (e) {
        console.error('CRITICAL: Failed to initialize PrismaClient', e);
        throw e;
      }
    }

    const value = (globalForPrisma.prisma as any)[prop];
    return typeof value === 'function' ? value.bind(globalForPrisma.prisma) : value;
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
