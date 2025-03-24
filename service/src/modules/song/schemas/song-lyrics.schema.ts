import { z } from 'zod';

export const lyricsSchema = z.object({
	lyrics: z.string(),
	copyright: z.string(),
	snippet: z.string(),
});

export const lyricsAPIResponseSchema = z.object({
	lyrics: z.string(),
	lyrics_copyright: z.string(),
	snippet: z.string(),
});

export type Lyrics = z.infer<typeof lyricsSchema>;
export type LyricsAPIResponse = z.infer<typeof lyricsAPIResponseSchema>;
