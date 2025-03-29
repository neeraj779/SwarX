import { env } from '@/config/env';
import * as dbSchema from '@/db/schema';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle(env.DB_FILE_NAME, {
	schema: dbSchema,
});
