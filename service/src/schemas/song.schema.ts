import { z } from 'zod';

export const songByIdsOrLinkSchema = z.object({
	ids: z.string().optional(),
	link: z
		.string()
		.url()
		.optional()
		.transform(value => value?.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1]),
});

export const songIdParamsSchema = z.object({
	id: z.string(),
});

export const songLyricsQuerySchema = z.object({
	lyrics: z.string().optional(),
});

export const songSuggestionsQuerySchema = z.object({
	limit: z.number().optional(),
});

export type SongByIdsOrLinkInput = z.infer<typeof songByIdsOrLinkSchema>;
export type SongIdParamsInput = z.infer<typeof songIdParamsSchema>;
export type SongLyricsQueryInput = z.infer<typeof songLyricsQuerySchema>;
export type SongSuggestionsQueryInput = z.infer<typeof songSuggestionsQuerySchema>;
