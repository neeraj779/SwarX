import { useFetch } from '../helpers/fetch.helper';
import { Endpoints } from '../constants/endpoint.constant';
import { z } from 'zod';
import { playlistAPIResponseSchema, playlistSchema } from '@/schemas/playlist.schema';
import { createPlaylistPayload } from '@/helpers/playlist.helper';
import { GetPlaylistById, GetPlaylistByLink } from '@/types/playlist.types';

export class PlaylistService {
	async getPlaylistById({
		id,
		page = 0,
		limit = 10,
	}: GetPlaylistById): Promise<z.infer<typeof playlistSchema>> {
		const { data } = await useFetch<z.infer<typeof playlistAPIResponseSchema>>({
			endpoint: Endpoints.playlists.id,
			params: {
				listid: id,
				n: limit,
				p: page,
			},
		});

		if (!data) throw new Error('Playlist not found');

		const playlist = createPlaylistPayload(data);
		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, limit) || [],
		};
	}

	async getPlaylistByLink({
		token,
		page = 0,
		limit = 10,
	}: GetPlaylistByLink): Promise<z.infer<typeof playlistSchema>> {
		const { data } = await useFetch<z.infer<typeof playlistAPIResponseSchema>>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				n: limit,
				p: page,
				type: 'playlist',
			},
		});

		if (!data) throw new Error('Playlist not found');

		const playlist = createPlaylistPayload(data);

		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, limit) || [],
		};
	}
}
