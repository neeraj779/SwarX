import { envServer } from "@/config/env.server";
import { db } from "@/db";
import { user } from "@/db/auth.schema";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { count } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  databaseHooks: {
    user: {
      create: {
        async before(userData) {
          const userCount = await db.select({ count: count() }).from(user);
          return {
            data: {
              ...userData,
              ...(userCount.length && userCount[0].count === 0
                ? {
                    role: "admin",
                  }
                : {
                    banned: false,
                  }),
            },
          };
        },
      },
    },
  },
  secret: envServer.AUTH_SECRET,
  baseURL: envServer.AUTH_URL,
  trustedOrigins: [envServer.AUTH_URL, "*"],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: {
    google: {
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: envServer.GITHUB_CLIENT_ID,
      clientSecret: envServer.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    admin({
      adminRole: "admin",
      defaultRole: "user",
    }),
  ],
});
