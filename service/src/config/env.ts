import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
	DB_FILE_NAME: z.string().default('db.sqlite'),
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
