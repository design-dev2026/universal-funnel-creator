// src/lib/prisma.ts
// Robust Prisma singleton with lazy loading to prevent build-time/runtime crashes
const globalForPrisma = globalThis as any;

export const prisma = new Proxy({} as any, {
  get: (target, prop) => {
    if (prop === 'then') return undefined; // Handle async/await checks
    
    if (!globalForPrisma.prisma) {
      try {
        // Fallback for environment where @prisma/client might not be fully generated yet
        const { PrismaClient } = require('@prisma/client');
        globalForPrisma.prisma = new PrismaClient({
          datasourceUrl: process.env.DATABASE_URL
        });
      } catch (e) {
        console.error('Prisma Client failed to initialize. Ensure DATABASE_URL is set and prisma generate has run.', e);
        // Return a mock that throws descriptive errors instead of crashing the whole process
        return () => { throw new Error('Prisma Client not available. Check server logs.'); };
      }
    }
    return globalForPrisma.prisma[prop];
  }
});
