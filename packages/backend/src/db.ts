// src/db.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a global prisma instance to avoid multiple connections
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// In development, store the client on the global object to prevent hot-reload issues
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Test the connection
export const testConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully via Prisma');

    // Test query to verify connection
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('📊 Connected to PostgreSQL database via Prisma');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Graceful shutdown
export const closeConnection = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log('🔌 Prisma connection closed');
  } catch (error) {
    console.error('Error closing Prisma connection:', error);
    throw error;
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT, closing Prisma connection...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM, closing Prisma connection...');
  await closeConnection();
  process.exit(0);
});
