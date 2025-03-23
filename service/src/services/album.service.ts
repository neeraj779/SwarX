import { useFetch } from '../helpers/fetch.helper';
import { Endpoints } from '../constants/endpoint.constant';
import { z } from 'zod';
import { albumAPIResponseSchema, albumSchema } from '@/schemas/album.schema';
import { createAlbumPayload } from '@/helpers/album.helper';

export class AlbumService {
	async getAlbumById(id: string): Promise<z.infer<typeof albumSchema>> {
		const { data } = await useFetch<z.infer<typeof albumAPIResponseSchema>>({
			endpoint: Endpoints.albums.id,
			params: { albumid: id },
		});

		if (!data) throw new Error('Album not found');

		return createAlbumPayload(data);
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

		return createAlbumPayload(data);
	}
}
