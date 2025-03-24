import { z } from 'zod';

const sortBySchema = z.enum(['popularity', 'latest', 'alphabetical']);
const sortOrderSchema = z.enum(['asc', 'desc']);

const extractArtistIdFromLink = (value?: string) =>
	value?.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1];

const commonFields = {
	page: z.string().optional(),
	songCount: z.string().optional(),
	albumCount: z.string().optional(),
	sortBy: sortBySchema.optional(),
	sortOrder: sortOrderSchema.optional(),
};

export const artistByIdOrLinkSchema = z.union([
	z.object({
		id: z.string(),
		link: z.undefined(),
		...commonFields,
	}),
	z.object({
		id: z.undefined(),
		link: z.string().url().transform(extractArtistIdFromLink),
		...commonFields,
	}),
]);

export const artistIdParamsSchema = z.object({
	id: z.string(),
});

export const artistPaginatedQuerySchema = z.object({
	page: z.string().optional(),
	sortBy: sortBySchema.optional(),
	sortOrder: sortOrderSchema.optional(),
});

export type ArtistByIdOrLinkInput = z.infer<typeof artistByIdOrLinkSchema>;
export type ArtistIdParamsInput = z.infer<typeof artistIdParamsSchema>;
export type ArtistPaginatedQueryInput = z.infer<typeof artistPaginatedQuerySchema>;
