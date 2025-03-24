import { songAPIResponseSchema, songSchema } from '@/modules/song/schemas/song.schema';
import { z } from 'zod';

export const searchSongAPIResponseSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(songAPIResponseSchema),
});

export const searchSongSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(songSchema),
});

export type SearchSongAPIResponse = z.infer<typeof searchSongAPIResponseSchema>;
export type SearchSong = z.infer<typeof searchSongSchema>;
