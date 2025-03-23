import { z } from 'zod';

export const searchQuerySchema = z.object({
	query: z.string(),
});

export const searchPaginatedQuerySchema = z.object({
	query: z.string(),
	page: z.string().pipe(z.coerce.number()).optional(),
	limit: z.string().pipe(z.coerce.number()).optional(),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type SearchPaginatedQueryInput = z.infer<typeof searchPaginatedQuerySchema>;
