import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { z } from 'zod';
import {
	songSearchAlbumAPIResponseSchema,
	songSearchAlbumSchema,
	songSearchAPIResponseSchema,
	searchArtistAPIResponseSchema,
	searchArtistSchema,
	songSearchPlaylistAPIResponseSchema,
	songSearchPlaylistSchema,
	songSearchSchema,
	searchSongAPIResponseSchema,
	searchsongSchema,
} from './schemas';
import {
	SearchAlbums,
	SearchArtists,
	SearchPlaylists,
	SearchSongs,
} from './types/song-search.types';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import { artistMapResponseDto } from '@/modules/artist/dto/artist.dto';
import {
	songSearchAlbumResponseDto,
	songSearchPlaylistResponseDto,
	songSearchResponseDto,
} from './dto/song-search.dto';

export class SearchService {
	async searchAll(query: string): Promise<z.infer<typeof songSearchSchema>> {
		const { data } = await useFetch<z.infer<typeof songSearchAPIResponseSchema>>({
			endpoint: Endpoints.search.all,
			params: { query },
		});

		if (!data) throw new Error(`No results found for ${query}`);

		return songSearchResponseDto(data);
	}

	async searchSongs({
		query,
		page = 0,
		limit = 10,
	}: SearchSongs): Promise<z.infer<typeof searchsongSchema>> {
		const { data } = await useFetch<z.infer<typeof searchSongAPIResponseSchema>>({
			endpoint: Endpoints.search.songs,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return {
			total: data.total,
			start: data.start,
			results: data.results?.map(songResponseDto).slice(0, limit) || [],
		};
	}

	async searchAlbums({
		query,
		page = 0,
		limit = 10,
	}: SearchAlbums): Promise<z.infer<typeof songSearchAlbumSchema>> {
		const { data } = await useFetch<z.infer<typeof songSearchAlbumAPIResponseSchema>>({
			endpoint: Endpoints.search.albums,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return songSearchAlbumResponseDto(data);
	}

	async searchArtists({
		query,
		page = 0,
		limit = 10,
	}: SearchArtists): Promise<z.infer<typeof searchArtistSchema>> {
		const { data } = await useFetch<z.infer<typeof searchArtistAPIResponseSchema>>({
			endpoint: Endpoints.search.artists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw new Error(`No results found for ${query}`);

		return {
			total: data.total,
			start: data.start,
			results: data.results?.map(artistMapResponseDto).slice(0, limit) || [],
		};
	}

	async searchPlaylists({
		query,
		page = 0,
		limit = 10,
	}: SearchPlaylists): Promise<z.infer<typeof songSearchPlaylistSchema>> {
		const { data } = await useFetch<z.infer<typeof songSearchPlaylistAPIResponseSchema>>({
			endpoint: Endpoints.search.playlists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw new Error(`No results found for ${query}`);

		return songSearchPlaylistResponseDto(data);
	}
}
