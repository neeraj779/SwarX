import { songAPIResponseSchema, songSchema } from '@/modules/song/schemas/song.schema';
import { z } from 'zod';

export const artistSongAPIResponseSchema = z.object({
	artistId: z.string(),
	name: z.string(),
	subtitle: z.string(),
	image: z.string(),
	follower_count: z.string(),
	type: z.string(),
	isVerified: z.boolean(),
	dominantLanguage: z.string(),
	dominantType: z.string(),
	topSongs: z.object({
		songs: z.array(songAPIResponseSchema),
		total: z.number(),
	}),
});

export const artistSongSchema = z.object({
	total: z.number(),
	songs: z.array(songSchema),
});
