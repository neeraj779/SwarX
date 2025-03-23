import { useFetch } from '../helpers/fetch.helper';
import { Endpoints } from '../constants/endpoint.constant';
import {
	createSearchAlbumPayload,
	createSearchPayload,
	createSearchPlaylistPayload,
} from '../helpers/search.helper';
import { z } from 'zod';
import {
	searchAlbumAPIResponseSchema,
	searchAlbumSchema,
	searchAPIResponseSchema,
	searchArtistAPIResponseSchema,
	searchArtistSchema,
	searchPlaylistAPIResponseSchema,
	searchPlaylistSchema,
	searchSchema,
	searchSongAPIResponseSchema,
	searchsongSchema,
} from '@/schemas/serach';
import { SearchAlbums, SearchArtists, SearchPlaylists, SearchSongs } from '@/types/search.type';
import { createSongPayload } from '@/helpers/song.helper';
import { createArtistMapPayload } from '@/helpers/artist.helper';

export class SearchService {
	async searchAll(query: string): Promise<z.infer<typeof searchSchema>> {
		const { data } = await useFetch<z.infer<typeof searchAPIResponseSchema>>({
			endpoint: Endpoints.search.all,
			params: { query },
		});

		if (!data) throw new Error(`No results found for ${query}`);

		return createSearchPayload(data);
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
			results: data.results?.map(createSongPayload).slice(0, limit) || [],
		};
	}

	async searchAlbums({
		query,
		page = 0,
		limit = 10,
	}: SearchAlbums): Promise<z.infer<typeof searchAlbumSchema>> {
		const { data } = await useFetch<z.infer<typeof searchAlbumAPIResponseSchema>>({
			endpoint: Endpoints.search.albums,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return createSearchAlbumPayload(data);
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
			results: data.results?.map(createArtistMapPayload).slice(0, limit) || [],
		};
	}

	async searchPlaylists({
		query,
		page = 0,
		limit = 10,
	}: SearchPlaylists): Promise<z.infer<typeof searchPlaylistSchema>> {
		const { data } = await useFetch<z.infer<typeof searchPlaylistAPIResponseSchema>>({
			endpoint: Endpoints.search.playlists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw new Error(`No results found for ${query}`);

		return createSearchPlaylistPayload(data);
	}
}
