import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { z } from 'zod';
import {
	playlistAPIResponseSchema,
	playlistSchema,
} from '@/modules/playlist/schemas/playlist.schema';
import { GetPlaylistById, GetPlaylistByLink } from './types/playlist.types';
import { playlistResponseDto } from './dto/playlist.dto';

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

		const playlist = playlistResponseDto(data);
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

		const playlist = playlistResponseDto(data);

		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, limit) || [],
		};
	}
}
