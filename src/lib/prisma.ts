import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton
 * 
 * We use a Proxy to ensure that the PrismaClient is only instantiated at runtime
 * when it's actually needed. This prevents "DATABASE_URL must be provided" errors
 * during the Next.js build phase (static analysis) when environment variables 
 * might be missing.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    // Prevent Proxy from interfering with async/await checks
    if (prop === 'then') return undefined;

    if (!globalForPrisma.prisma) {
      const url = process.env.DATABASE_URL;
      
      // During build phase, if the URL is missing, we return a safe mock
      // that prevents crashes during static generation.
      if (!url && process.env.NEXT_PHASE === 'phase-production-build') {
        return (target as any)[prop];
      }

      try {
        globalForPrisma.prisma = new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });
      } catch (e) {
        console.error('CRITICAL: Failed to initialize PrismaClient', e);
        throw e;
      }
    }

    const value = (globalForPrisma.prisma as any)[prop];
    // If the property is a function (like $queryRaw or findUnique), bind it to the instance
    return typeof value === 'function' ? value.bind(globalForPrisma.prisma) : value;
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
