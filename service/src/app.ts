import express from 'express';
import { auth } from '@/lib/auth';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { apiRouter } from './routes';
import { env } from './config/env';

const app = express();

app.use(
	cors({
		origin: env.CORS_ORIGINS,
		credentials: true,
	}),
);

app.all('/api/auth/*', toNodeHandler(auth));

app.use('/api', apiRouter);

export default app;
