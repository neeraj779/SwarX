import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import { z } from 'zod';
import { albumResponseDto } from '@/modules/album/dto/album.dto';
import { albumAPIResponseSchema, albumSchema } from './schemas/album.schema';

export class AlbumService {
	async getAlbumById(id: string): Promise<z.infer<typeof albumSchema>> {
		const { data } = await useFetch<z.infer<typeof albumAPIResponseSchema>>({
			endpoint: Endpoints.albums.id,
			params: { albumid: id },
		});

		if (!data) throw new Error('Album not found');

		return albumResponseDto(data);
	}

	async getAlbumByLink(token: string): Promise<z.infer<typeof albumSchema>> {
		const { data } = await useFetch<z.infer<typeof albumAPIResponseSchema>>({
			endpoint: Endpoints.albums.link,
			params: {
				token,
				type: 'album',
			},
		});

		if (!data) throw new Error('Album not found');

		return albumResponseDto(data);
	}
}
