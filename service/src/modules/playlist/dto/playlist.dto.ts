import { createImageLinks } from '@/shared/utils/link.util';
import { artistMapResponseDto } from '@/modules/artist/dto/artist.dto';
import { songResponseDto } from '@/modules/song/dto/song.dto';
import type { playlistAPIResponseSchema, playlistSchema } from '../schemas/playlist.schema';
import type { z } from 'zod';

export const playlistResponseDto = (
	playlist: z.infer<typeof playlistAPIResponseSchema>,
): z.infer<typeof playlistSchema> => ({
	id: playlist.id,
	name: playlist.title,
	description: playlist.header_desc,
	type: playlist.type,
	year: playlist.year ? Number(playlist.year) : null,
	playCount: playlist.play_count ? Number(playlist.play_count) : null,
	language: playlist.language,
	explicitContent: playlist.explicit_content === '1',
	url: playlist.perma_url,
	songCount: playlist.list_count ? Number(playlist.list_count) : null,
	artists: playlist.more_info.artists?.map(artistMapResponseDto) || null,
	image: createImageLinks(playlist.image),
	songs: (playlist.list && playlist.list?.map(songResponseDto)) || null,
});
