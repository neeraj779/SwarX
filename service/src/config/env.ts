import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
	PORT: z.string().transform(Number).pipe(z.number().positive().int()).default('3000'),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	CORS_ORIGINS: z
		.string()
		.transform(str => str.split(','))
		.pipe(z.array(z.string().url()))
		.optional(),
	LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
	DB_FILE_NAME: z.string().default('file:db.sqlite'),
	AUTH_SECRET: z.string().min(1),
	AUTH_URL: z.string().url().default('http://localhost:3001'),
	GOOGLE_CLIENT_ID: z.string().min(1),
	GOOGLE_CLIENT_SECRET: z.string().min(1),
	GITHUB_CLIENT_ID: z.string().min(1),
	GITHUB_CLIENT_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
	try {
		return envSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors
				.map(err => {
					return `${err.path.join('.')}: ${err.message}`;
				})
				.join('\n');

			throw new Error(`❌ Invalid environment variables:\n${errors}`);
		}
		throw error;
	}
}

export const env = validateEnv();
