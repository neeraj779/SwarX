import { downloadLinkSchema } from '@/shared/schemas/download.schema';
import {
	artistMapAPIResponseSchema,
	artistMapSchema,
} from '@/modules/artist/schemas/artist-map.schema';
import { z } from 'zod';
import { lyricsSchema } from './song-lyrics.schema';

export const songAPIResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string(),
	header_desc: z.string(),
	type: z.string(),
	perma_url: z.string(),
	image: z.string(),
	language: z.string(),
	year: z.string(),
	play_count: z.string(),
	explicit_content: z.string(),
	list_count: z.string(),
	list_type: z.string(),
	list: z.string(),
	more_info: z.object({
		music: z.string(),
		album_id: z.string(),
		album: z.string(),
		label: z.string(),
		origin: z.string(),
		is_dolby_content: z.boolean(),
		'320kbps': z.string(),
		encrypted_media_url: z.string(),
		encrypted_cache_url: z.string(),
		album_url: z.string(),
		duration: z.string(),
		rights: z.object({
			code: z.string(),
			cacheable: z.string(),
			delete_cached_object: z.string(),
			reason: z.string(),
		}),
		cache_state: z.string(),
		has_lyrics: z.string(),
		lyrics_snippet: z.string(),
		starred: z.string(),
		copyright_text: z.string(),
		artistMap: z.object({
			primary_artists: z.array(artistMapAPIResponseSchema),
			featured_artists: z.array(artistMapAPIResponseSchema),
			artists: z.array(artistMapAPIResponseSchema),
		}),
		release_date: z.string(),
		label_url: z.string(),
		vcode: z.string(),
		vlink: z.string(),
		triller_available: z.boolean(),
		request_jiotune_flag: z.boolean(),
		webp: z.string(),
		lyrics_id: z.string(),
	}),
});

export const songSchema = z.object({
	id: z.string(),
	name: z.string(),
	type: z.string(),
	year: z.string().nullable(),
	releaseDate: z.string().nullable(),
	duration: z.number().nullable(),
	label: z.string().nullable(),
	explicitContent: z.boolean(),
	playCount: z.number().nullable(),
	language: z.string(),
	hasLyrics: z.boolean(),
	lyricsId: z.string().nullable(),
	lyrics: lyricsSchema.optional(),
	url: z.string(),
	copyright: z.string().nullable(),
	album: z.object({
		id: z.string().nullable(),
		name: z.string().nullable(),
		url: z.string().nullable(),
	}),
	artists: z.object({
		primary: z.array(artistMapSchema),
		featured: z.array(artistMapSchema),
		all: z.array(artistMapSchema),
	}),
	image: z.array(downloadLinkSchema),
	downloadUrl: z.array(downloadLinkSchema),
});

export const songByIdsOrLinkSchema = z.union([
	z.object({
		ids: z.string().trim().min(1, 'Song ID(s) are required.'),
		link: z.undefined(),
	}),
	z.object({
		ids: z.undefined(),
		link: z
			.string()
			.url()
			.transform(value => value?.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1]),
	}),
]);

export const songIdParamsSchema = z.object({
	id: z.string(),
});

export const songLyricsQuerySchema = z.object({
	lyrics: z.string().optional(),
});

export const songSuggestionsQuerySchema = z.object({
	limit: z.string().optional(),
});

export type Song = z.infer<typeof songSchema>;
export type SongAPIResponse = z.infer<typeof songAPIResponseSchema>;
export type SongByIdsOrLinkInput = z.infer<typeof songByIdsOrLinkSchema>;
export type SongIdParamsInput = z.infer<typeof songIdParamsSchema>;
export type SongLyricsQueryInput = z.infer<typeof songLyricsQuerySchema>;
export type SongSuggestionsQueryInput = z.infer<typeof songSuggestionsQuerySchema>;
