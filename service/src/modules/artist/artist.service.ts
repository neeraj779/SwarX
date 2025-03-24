import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import {
	GetArtistAlbums,
	GetArtistById,
	GetArtistByLink,
	GetArtistSongs,
} from './types/artist.types';
import {
	artistAlbumAPIResponseSchema,
	artistAlbumSchema,
	artistAPIResponseSchema,
	artistSchema,
	artistSongAPIResponseSchema,
	artistSongSchema,
} from './schemas';
import { z } from 'zod';
import { albumResponseDto } from '@/modules/album/dto/album.dto';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import { artistResponseDto } from './dto/artist.dto';

export class ArtistService {
	async getArtistById({
		artistId,
		page = 0,
		songCount = 10,
		albumCount = 10,
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistById): Promise<z.infer<typeof artistSchema>> {
		const { data } = await useFetch<z.infer<typeof artistAPIResponseSchema>>({
			endpoint: Endpoints.artists.id,
			params: {
				artistId,
				n_song: songCount,
				n_album: albumCount,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw new Error('Artist not found');

		return artistResponseDto(data);
	}

	async getArtistByLink({
		token,
		page = 0,
		songCount = 10,
		albumCount = 10,
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistByLink): Promise<z.infer<typeof artistSchema>> {
		const { data } = await useFetch<z.infer<typeof artistAPIResponseSchema>>({
			endpoint: Endpoints.artists.link,
			params: {
				token,
				n_song: songCount,
				n_album: albumCount,
				page,
				sort_order: sortOrder,
				category: sortBy,
				type: 'artist',
			},
		});

		if (!data) throw new Error('Artist not found');

		return artistResponseDto(data);
	}

	async getArtistSongs({
		artistId,
		page = 0,
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistSongs): Promise<z.infer<typeof artistSongSchema>> {
		const { data } = await useFetch<z.infer<typeof artistSongAPIResponseSchema>>({
			endpoint: Endpoints.artists.songs,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw new Error('Songs not found');

		return {
			total: data.topSongs.total,
			songs: data.topSongs.songs.map(song => songResponseDto(song)),
		};
	}

	async getArtistAlbums({
		artistId,
		page = 0,
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistAlbums): Promise<z.infer<typeof artistAlbumSchema>> {
		const { data } = await useFetch<z.infer<typeof artistAlbumAPIResponseSchema>>({
			endpoint: Endpoints.artists.albums,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw new Error('Albums not found');

		return {
			total: data.topAlbums.total,
			albums: data.topAlbums.albums.map(album => albumResponseDto(album)),
		};
	}
}
