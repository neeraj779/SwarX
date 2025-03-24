import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export type ValidationType = 'body' | 'query' | 'params';

export const createValidationMiddleware = (schema: AnyZodObject, type: ValidationType = 'body') => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const data = req[type];
			const parsedData = await schema.parseAsync(data);
			req[type] = parsedData;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					error: `Validation Error on ${type}`,
					details: error.issues,
				});
				return;
			}
			next(error);
		}
	};
};

type ValidationMiddleware = ReturnType<typeof createValidationMiddleware>;

export const zValidator = (type: ValidationType, schema: AnyZodObject): ValidationMiddleware =>
	createValidationMiddleware(schema, type);
