import { env } from '@/config/env';

export const trustProxy = env.TRUST_PROXY;

export const securityHeaders = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
			styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
			imgSrc: ["'self'", 'data:', 'https:'],
			connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
			fontSrc: ["'self'", 'https:', 'data:'],
			objectSrc: ["'none'"],
			mediaSrc: ["'self'"],
			frameSrc: ["'none'"],
		},
	},
	crossOriginEmbedderPolicy: true,
	crossOriginOpenerPolicy: true,
	crossOriginResourcePolicy: true,
	dnsPrefetchControl: true,
	frameguard: true,
	hidePoweredBy: true,
	hsts: true,
	ieNoOpen: true,
	noSniff: true,
	referrerPolicy: true,
	xssFilter: true,
};
