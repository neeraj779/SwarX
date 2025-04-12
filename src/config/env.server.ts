import { z } from "zod";

const envServerSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().default("http://localhost:3000"),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  SAAVNIFY_API_BASE_URL: z.string().url(),
});

function validateServerEnv(): z.infer<typeof envServerSchema> {
  try {
    return envServerSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");

      throw new Error(`❌ Invalid environment variables:\n${errors}`);
    }
    throw error;
  }
}

export const envServer = validateServerEnv();
