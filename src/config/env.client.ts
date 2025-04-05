import { z } from "zod";

const envClientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

function validateClientEnv(): z.infer<typeof envClientSchema> {
  try {
    return envClientSchema.parse({
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");

      throw new Error(`❌ Invalid client environment variables:\n${errors}`);
    }
    throw error;
  }
}

export const envClient = validateClientEnv();
