/**
 * app/lib/prisma.ts
 *
 * Singleton Prisma client — prevents "Too many connections" in dev
 * (Next.js hot-reload creates a new module instance on every save).
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}