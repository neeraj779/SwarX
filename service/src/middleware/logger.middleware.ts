import pino, { Logger, TransportMultiOptions } from 'pino';
import pinoHttp from 'pino-http';
import { Request, Response } from 'express';
import { env } from '@/config/env';

const transport: TransportMultiOptions = {
	targets: [
		...(env.NODE_ENV !== 'production'
			? [
					{
						target: 'pino-pretty',
						level: env.LOG_LEVEL,
						options: {
							colorize: true,
							translateTime: 'SYS:standard',
							ignore: 'pid,hostname',
						},
					},
				]
			: []),

		...(env.NODE_ENV === 'production'
			? [
					{
						target: 'pino/file',
						level: 'info',
						options: {
							destination: './logs/app.log',
							mkdir: true,
						},
					},
					{
						target: 'pino-pretty',
						level: env.LOG_LEVEL,
						options: {
							colorize: false,
							translateTime: 'SYS:standard',
							ignore: 'pid,hostname',
						},
					},
				]
			: []),
	],
};

const logger: Logger = pino({
	level: env.LOG_LEVEL,
	transport,
	timestamp: pino.stdTimeFunctions.isoTime,
	nestedKey: 'payload',
});

export const requestLogger = pinoHttp<Request, Response>({
	logger,
	customProps: (_req: Request) => ({
		env: env.NODE_ENV,
	}),

	redact: {
		paths: ['res', 'req.headers'],
		remove: true,
	},
	customSuccessMessage: (req, res) => {
		if (res.statusCode === 404) {
			return 'Resource not found';
		}
		return `${req.method} ${req.url} completed`;
	},
	customErrorMessage: (req, res, err) => {
		return `${req.method} ${req.url} failed: ${err.message}`;
	},
});

process.on('beforeExit', () => {
	logger.flush();
});

export default logger;
