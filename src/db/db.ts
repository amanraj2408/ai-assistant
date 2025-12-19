import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let db: any = null;

function getDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Please set it in your environment variables.');
  }
  
  if (!db) {
    const client = postgres(process.env.DATABASE_URL, { max: 1 });
    db = drizzle(client, { schema });
  }
  
  return db;
}

export { getDB as db };
