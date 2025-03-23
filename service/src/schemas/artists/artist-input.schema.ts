import { z } from 'zod';

const sortBySchema = z.enum(['popularity', 'latest', 'alphabetical']);
const sortOrderSchema = z.enum(['asc', 'desc']);

export const artistByIdOrLinkSchema = z.object({
	link: z
		.string()
		.url()
		.optional()
		.transform(value => value?.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1]),
	id: z.string().optional(),
	page: z.string().pipe(z.coerce.number()).optional(),
	songCount: z.string().pipe(z.coerce.number()).optional(),
	albumCount: z.string().pipe(z.coerce.number()).optional(),
	sortBy: z.enum(['popularity', 'latest', 'alphabetical']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const artistIdParamsSchema = z.object({
	id: z.string(),
});

export const artistPaginatedQuerySchema = z.object({
	page: z.string().pipe(z.coerce.number()).optional(),
	sortBy: sortBySchema.optional(),
	sortOrder: sortOrderSchema.optional(),
});

export type ArtistByIdOrLinkInput = z.infer<typeof artistByIdOrLinkSchema>;
export type ArtistIdParamsInput = z.infer<typeof artistIdParamsSchema>;
export type ArtistPaginatedQueryInput = z.infer<typeof artistPaginatedQuerySchema>;
