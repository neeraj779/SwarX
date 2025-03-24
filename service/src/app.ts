import express from 'express';
import { auth } from '@/lib/auth';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { errorHandler, notFoundHandler } from '@/middleware/error.middleware';
import { apiRouter } from './routes';
import { env } from './config/env';
import { requestLogger } from './middleware/logger.middleware';
import { securityHeaders, trustProxy } from './middleware/security.middleware';
import helmet from 'helmet';

const app = express();

app.set('trust proxy', trustProxy);

app.use(helmet(securityHeaders));

app.use(
	cors({
		origin: env.CORS_ORIGINS,
		credentials: true,
	}),
);

app.all('/api/auth/*', toNodeHandler(auth));

app.use(requestLogger);

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
