import { songAPIResponseSchema, songSchema } from '@/modules/song/schemas/song.schema';
import { z } from 'zod';

export const searchSongAPIResponseSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(songAPIResponseSchema),
});

export const searchsongSchema = z.object({
	total: z.number(),
	start: z.number(),
	results: z.array(songSchema),
});
