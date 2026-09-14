import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/@libsql/client';
import * as schema from './schema';

// Inisialisasi koneksi Turso
const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
