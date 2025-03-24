import { createImageLinks } from '@/shared/utils/link.util';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import type { albumAPIResponseSchema, albumSchema } from '../schemas/album.schema';
import type { z } from 'zod';
import { artistMapResponseDto } from '@/modules/artist/dto/artist.dto';

export const albumResponseDto = (
	album: z.infer<typeof albumAPIResponseSchema>,
): z.infer<typeof albumSchema> => ({
	id: album.id,
	name: album.title,
	description: album.header_desc,
	type: album.type,
	year: album.year ? Number(album.year) : null,
	playCount: album.play_count ? Number(album.play_count) : null,
	language: album.language,
	explicitContent: album.explicit_content === '1',
	url: album.perma_url,
	songCount: album.more_info.song_count ? Number(album.more_info.song_count) : null,
	artists: {
		primary: album.more_info?.artistMap?.primary_artists?.map(artistMapResponseDto),
		featured: album.more_info?.artistMap?.featured_artists?.map(artistMapResponseDto),
		all: album.more_info?.artistMap?.artists?.map(artistMapResponseDto),
	},
	image: createImageLinks(album.image),
	songs: (album.list && album.list?.map(songResponseDto)) || null,
});
