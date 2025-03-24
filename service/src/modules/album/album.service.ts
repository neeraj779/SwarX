import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { ErrorMessages } from '@/shared/constants/error.constant';
import { AppError } from '@/shared/types/error.types';
import { albumResponseDto } from '@/modules/album/dto/album.dto';
import { Album, AlbumAPIResponse } from './schemas/album.schema';

export class AlbumService {
	async getAlbumById(id: string): Promise<Album> {
		const { data } = await useFetch<AlbumAPIResponse>({
			endpoint: Endpoints.albums.id,
			params: { albumid: id },
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);

		return albumResponseDto(data);
	}

	async getAlbumByLink(token: string): Promise<Album> {
		const { data } = await useFetch<AlbumAPIResponse>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				type: 'album',
			},
		});

		if (!data) throw AppError.NotFound(ErrorMessages.Album.NOT_FOUND);

		return albumResponseDto(data);
	}
}

export const albumService = new AlbumService();
