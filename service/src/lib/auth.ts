import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { openAPI } from 'better-auth/plugins';
import { env } from '@/config/env';
import { admin } from 'better-auth/plugins';
import { count } from 'drizzle-orm';
import { user } from '@/db/auth.schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
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
										role: 'admin',
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
	secret: env.AUTH_SECRET,
	baseURL: env.AUTH_URL,
	trustedOrigins: [env.AUTH_URL, '*'],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [
		...(env.NODE_ENV !== 'production' ? [openAPI()] : []),
		admin({
			adminRole: 'admin',
			defaultRole: 'user',
		}),
	],
});
