import { albumAPIResponseSchema, albumSchema } from '@/schemas/album.schema';
import { z } from 'zod';

export const artistAlbumAPIResponseSchema = z.object({
	artistId: z.string(),
	name: z.string(),
	subtitle: z.string(),
	image: z.string(),
	follower_count: z.string(),
	type: z.string(),
	isVerified: z.boolean(),
	dominantLanguage: z.string(),
	dominantType: z.string(),
	topAlbums: z.object({
		albums: z.array(albumAPIResponseSchema),
		total: z.number(),
	}),
});

export const artistAlbumSchema = z.object({
	total: z.number(),
	albums: z.array(albumSchema),
});
