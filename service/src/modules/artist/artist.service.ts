import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { ErrorMessages } from '@/shared/constants/error.constant';
import { AppError } from '@/shared/types/error.types';
import {
	GetArtistAlbums,
	GetArtistById,
	GetArtistByLink,
	GetArtistSongs,
} from './types/artist.types';
import { albumResponseDto } from '@/modules/album/dto/album.dto';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import { artistResponseDto } from './dto/artist.dto';
import { Artist, ArtistAPIResponse } from './schemas/artist.schema';
import { ArtistSong, ArtistSongAPIResponse } from './schemas/artist-song.schema';
import { ArtistAlbum, ArtistAlbumAPIResponse } from './schemas/artist-album.schema';

export class ArtistService {
	async getArtistById({
		artistId,
		page = '0',
		songCount = '10',
		albumCount = '10',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistById): Promise<Artist> {
		const { data } = await useFetch<ArtistAPIResponse>({
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

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.NOT_FOUND);

		return artistResponseDto(data);
	}

	async getArtistByLink({
		token,
		page = '0',
		songCount = '10',
		albumCount = '10',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistByLink): Promise<Artist> {
		const { data } = await useFetch<ArtistAPIResponse>({
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

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.NOT_FOUND);

		return artistResponseDto(data);
	}

	async getArtistSongs({
		artistId,
		page = '0',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistSongs): Promise<ArtistSong> {
		const { data } = await useFetch<ArtistSongAPIResponse>({
			endpoint: Endpoints.artists.songs,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.SONGS_NOT_FOUND);

		return {
			total: data.topSongs.total,
			songs: data.topSongs.songs.map(song => songResponseDto(song)),
		};
	}

	async getArtistAlbums({
		artistId,
		page = '0',
		sortBy = 'popularity',
		sortOrder = 'desc',
	}: GetArtistAlbums): Promise<ArtistAlbum> {
		const { data } = await useFetch<ArtistAlbumAPIResponse>({
			endpoint: Endpoints.artists.albums,
			params: {
				artistId,
				page,
				sort_order: sortOrder,
				category: sortBy,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Artist.ALBUMS_NOT_FOUND);

		return {
			total: data.topAlbums.total,
			albums: data.topAlbums.albums.map(album => albumResponseDto(album)),
		};
	}
}

export const artistService = new ArtistService();
