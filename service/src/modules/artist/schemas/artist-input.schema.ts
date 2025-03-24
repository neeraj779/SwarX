import { z } from 'zod';

const sortBySchema = z.enum(['popularity', 'latest', 'alphabetical']);
const sortOrderSchema = z.enum(['asc', 'desc']);

const extractArtistIdFromLink = (value?: string) =>
	value?.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1];

export const artistByIdOrLinkSchema = z
	.object({
		link: z.string().url().optional().transform(extractArtistIdFromLink),
		id: z.string().optional(),
		page: z.string().optional(),
		songCount: z.string().optional(),
		albumCount: z.string().optional(),
		sortBy: sortBySchema.optional(),
		sortOrder: sortOrderSchema.optional(),
	})
	.refine(data => data.id || data.link, {
		message: 'Either artist ID or link is required',
		path: ['id'],
	});

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
