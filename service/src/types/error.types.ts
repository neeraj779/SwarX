import { Request } from 'express';

export interface TypedRequest<T> extends Request {
	body: T;
}

export interface ErrorResponse {
	message: string;
	status: number;
	stack?: string;
	code?: string;
}

export class AppError extends Error {
	status: number;
	code?: string;

	constructor(message: string, status: number = 500, code?: string) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}

	static BadRequest(message: string, code?: string): AppError {
		return new AppError(message, 400, code);
	}

	static Unauthorized(message: string, code?: string): AppError {
		return new AppError(message, 401, code);
	}
	static Forbidden(message: string, code?: string): AppError {
		return new AppError(message, 403, code);
	}

	static NotFound(message: string, code?: string): AppError {
		return new AppError(message, 404, code);
	}

	static ValidationError(message: string, code?: string): AppError {
		return new AppError(message, 422, code);
	}

	static InternalError(message: string = 'Internal Server Error', code?: string): AppError {
		return new AppError(message, 500, code);
	}
}
