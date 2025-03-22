import app from '@/app';
import logger from '@/middleware/logger.middleware';
import { env } from '@/config/env';

const server = app.listen(env.PORT, () => {
	logger.info(`Server is running on port ${env.PORT}`);
});

const shutdown = async (): Promise<void> => {
	logger.info('Received shutdown signal. Starting graceful shutdown...');

	server.close(() => {
		logger.info('Server closed. Exiting process.');
		process.exit(0);
	});

	setTimeout(() => {
		logger.error('Could not close server gracefully. Forcing shutdown.');
		process.exit(1);
	}, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason: Error) => {
	logger.error('Unhandled Rejection:', reason);

	if (process.env.NODE_ENV !== 'production') {
		process.exit(1);
	}
});
