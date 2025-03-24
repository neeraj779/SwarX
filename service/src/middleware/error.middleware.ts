import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError, ErrorResponse } from '@/shared/types/error.types';
import { env } from '@/config/env';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	const response: ErrorResponse = {
		message: err.message || 'Internal Server Error',
		status: err.status || 500,
		code: err instanceof AppError ? err.code : undefined,
	};

	if (env.NODE_ENV !== 'production') {
		response.stack = err.stack;
	}

	if (env.NODE_ENV === 'production' && err.status === 500) {
		console.error('[Error]:', {
			message: err.message,
			stack: err.stack,
			timestamp: new Date().toISOString(),
		});
	}

	res.status(response.status).json(response);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
	const error = AppError.NotFound('Resource not found', 'RESOURCE_NOT_FOUND');
	res.status(error.status).json({
		message: error.message,
		status: error.status,
		code: error.code,
	});
};

type PathParamType = Record<string, unknown>;
type ReqBodyType = object;
type ReqQueryType = Record<string, unknown>;

export interface AsyncRequestHandlerType {
	params?: PathParamType;
	body?: ReqBodyType;
	query?: ReqQueryType;
}

type AsyncRequestHandler<T extends AsyncRequestHandlerType> = (
	req: Request<T['params'], object, T['body'], T['query']>,
	res: Response<object>,
	next: NextFunction,
) => Promise<void>;

export const asyncHandler = <T extends AsyncRequestHandlerType>(fn: AsyncRequestHandler<T>) => {
	return (
		req: Request<T['params'], object, T['body'], T['query']>,
		res: Response<object>,
		next: NextFunction,
	): void => {
		void Promise.resolve(fn(req, res, next)).catch(next);
	};
};
