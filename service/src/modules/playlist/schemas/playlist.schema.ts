import { downloadLinkSchema } from '../../../shared/schemas/download.schema';
import { artistMapSchema } from '@/modules/artist/schemas/artist-map.schema';
import { songAPIResponseSchema, songSchema } from '@/modules/song/schemas/song.schema';
import { z } from 'zod';

const commonFields = {
	page: z.string().optional(),
	limit: z.string().optional(),
};

const extractPlaylistIdFromLink = (value: string) => {
	const matches = value.match(
		/(?:jiosaavn\.com|saavn\.com)\/(?:featured|s\/playlist)\/[^/]+\/([^/]+)$|\/([^/]+)$/,
	);
	const filteredMatches = matches?.filter(each => each !== undefined);
	return (filteredMatches && filteredMatches[filteredMatches?.length - 1 || 0]) || undefined;
};

export const playlistByIdOrLinkSchema = z.union([
	z.object({
		id: z.string(),
		link: z.undefined(),
		...commonFields,
	}),
	z.object({
		id: z.undefined(),
		link: z.string().url().transform(extractPlaylistIdFromLink),
		...commonFields,
	}),
]);

export const playlistAPIResponseSchema = z
	.object({
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
		list: z.array(songAPIResponseSchema),
		more_info: z.object({
			uid: z.string(),
			is_dolby_content: z.boolean(),
			subtype: z.array(z.string()).default([]),
			last_updated: z.string(),
			username: z.string(),
			firstname: z.string(),
			lastname: z.string(),
			is_followed: z.string(),
			isFY: z.boolean(),
			follower_count: z.string(),
			fan_count: z.string(),
			playlist_type: z.string(),
			share: z.string(),
			sub_types: z.array(z.string()),
			images: z.array(z.string()),
			H2: z.string().nullable(),
			subheading: z.string(),
			video_count: z.string(),
			artists: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					role: z.string(),
					image: z.string(),
					type: z.string(),
					perma_url: z.string(),
				}),
			),
		}),
	})
	.extend({
		description: z.string(),
	});

export const playlistSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	year: z.number().nullable(),
	type: z.string(),
	playCount: z.number().nullable(),
	language: z.string(),
	explicitContent: z.boolean(),
	songCount: z.number().nullable(),
	url: z.string(),
	image: z.array(downloadLinkSchema),
	songs: z.array(songSchema).nullable(),
	artists: z.array(artistMapSchema).nullable(),
});

export type PlaylistByIdOrLinkInput = z.infer<typeof playlistByIdOrLinkSchema>;
export type PlaylistAPIResponse = z.infer<typeof playlistAPIResponseSchema>;
export type Playlist = z.infer<typeof playlistSchema>;
