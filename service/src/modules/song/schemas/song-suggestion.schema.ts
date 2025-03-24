import { z } from 'zod';
import { songAPIResponseSchema } from './song.schema';

const songStationAPIResponseSchema = z.record(
	z.string(),
	z.object({
		song: songAPIResponseSchema,
	}),
);

export const songSuggestionAPIResponseSchema = z
	.object({
		stationid: z.string(),
	})
	.and(songStationAPIResponseSchema);

export type SongSuggestionAPIResponse = z.infer<typeof songSuggestionAPIResponseSchema>;
