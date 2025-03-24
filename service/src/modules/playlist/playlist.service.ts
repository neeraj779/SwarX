import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { ErrorMessages } from '@/shared/constants/error.constant';
import { AppError } from '@/shared/types/error.types';
import { Playlist, PlaylistAPIResponse } from '@/modules/playlist/schemas/playlist.schema';
import { GetPlaylistById, GetPlaylistByLink } from './types/playlist.types';
import { playlistResponseDto } from './dto/playlist.dto';

export class PlaylistService {
	async getPlaylistById({ id, page = '0', limit = '10' }: GetPlaylistById): Promise<Playlist> {
		const { data } = await useFetch<PlaylistAPIResponse>({
			endpoint: Endpoints.playlists.id,
			params: {
				listid: id,
				n: limit,
				p: page,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);

		const playlist = playlistResponseDto(data);
		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, parseInt(limit)) || [],
		};
	}

	async getPlaylistByLink({
		token,
		page = '0',
		limit = '10',
	}: GetPlaylistByLink): Promise<Playlist> {
		const { data } = await useFetch<PlaylistAPIResponse>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				n: limit,
				p: page,
				type: 'playlist',
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Playlist.NOT_FOUND);

		const playlist = playlistResponseDto(data);

		return {
			...playlist,
			songCount: playlist?.songs?.length || null,
			songs: playlist?.songs?.slice(0, parseInt(limit)) || [],
		};
	}
}

export const playlistService = new PlaylistService();
