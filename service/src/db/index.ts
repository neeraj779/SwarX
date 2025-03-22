import { env } from '@/config/env';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle(env.DB_FILE_NAME);
