import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { ErrorMessages } from '@/shared/constants/error.constant';
import { AppError } from '@/shared/types/error.types';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import { artistMapResponseDto } from '@/modules/artist/dto/artist.dto';
import {
	songSearchAlbumResponseDto,
	songSearchPlaylistResponseDto,
	songSearchResponseDto,
} from './dto/song-search.dto';
import { SearchParams } from './types/song-search.types';
import { SongSearch, SongSearchAPIResponse } from './schemas/song-search.schema';
import { SearchSong, SearchSongAPIResponse } from './schemas/song-search-song.schema';
import { SearchArtist, SearchArtistAPIResponse } from './schemas/song-search-artist.schema';
import { SongSearchAlbum, SongSearchAlbumAPIResponse } from './schemas/song-search-album.schema';
import {
	SongSearchPlaylist,
	SongSearchPlaylistAPIResponse,
} from './schemas/song-search-playlist.schema';

export class SongSearchService {
	async searchAll(query: string): Promise<SongSearch> {
		const { data } = await useFetch<SongSearchAPIResponse>({
			endpoint: Endpoints.search.all,
			params: { query },
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return songSearchResponseDto(data);
	}

	async searchSongs({ query, page = '0', limit = '10' }: SearchParams): Promise<SearchSong> {
		const { data } = await useFetch<SearchSongAPIResponse>({
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
			results: data.results?.map(songResponseDto).slice(0, parseInt(limit)) || [],
		};
	}

	async searchAlbums({ query, page = '0', limit = '10' }: SearchParams): Promise<SongSearchAlbum> {
		const { data } = await useFetch<SongSearchAlbumAPIResponse>({
			endpoint: Endpoints.search.albums,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		return songSearchAlbumResponseDto(data);
	}

	async searchArtists({ query, page = '0', limit = '10' }: SearchParams): Promise<SearchArtist> {
		const { data } = await useFetch<SearchArtistAPIResponse>({
			endpoint: Endpoints.search.artists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return {
			total: data.total,
			start: data.start,
			results: data.results?.map(artistMapResponseDto).slice(0, parseInt(limit)) || [],
		};
	}

	async searchPlaylists({
		query,
		page = '0',
		limit = '10',
	}: SearchParams): Promise<SongSearchPlaylist> {
		const { data } = await useFetch<SongSearchPlaylistAPIResponse>({
			endpoint: Endpoints.search.playlists,
			params: {
				q: query,
				p: page,
				n: limit,
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Search.NO_RESULTS);

		return songSearchPlaylistResponseDto(data);
	}
}

export const songSearchService = new SongSearchService();
