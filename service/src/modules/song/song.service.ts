import type { GetSongById, GetSongSuggestions } from './types/song.types';
import { useFetch } from '@/shared/utils/fetch.util';
import { Endpoints } from '@/shared/constants/endpoint.constant';
import {
	lyricsAPIResponseSchema,
	lyricsSchema,
	songAPIResponseSchema,
	songSchema,
	songSuggestionAPIResponseSchema,
} from './schemas';
import { z } from 'zod';
import { songLyricsResponseDto, songResponseDto } from './dto/song.dto';

export class SongService {
	async getSongByIds({
		songIds,
		includeLyrics = false,
	}: GetSongById): Promise<z.infer<typeof songSchema>[]> {
		const { data } = await useFetch<{ songs: z.infer<typeof songAPIResponseSchema>[] }>({
			endpoint: Endpoints.songs.id,
			params: {
				pids: songIds,
			},
		});

		if (!data.songs?.length) throw new Error('No songs found');

		const songs = data.songs.map(song => songResponseDto(song));

		if (includeLyrics) {
			await Promise.all(
				songs.map(async song => {
					song.lyrics = await this.getSongLyrics(song.id);
				}),
			);
		}

		return songs;
	}

	async getSongByLink(token: string): Promise<z.infer<typeof songSchema>[]> {
		const { data } = await useFetch<{ songs: z.infer<typeof songAPIResponseSchema>[] }>({
			endpoint: Endpoints.songs.link,
			params: {
				token,
				type: 'song',
			},
		});

		if (!data.songs?.length) throw new Error('No songs found');

		return data.songs.map(song => songResponseDto(song));
	}

	async getSongLyrics(songId: string): Promise<z.infer<typeof lyricsSchema>> {
		const { data } = await useFetch<z.infer<typeof lyricsAPIResponseSchema>>({
			endpoint: Endpoints.songs.lyrics,
			params: {
				lyrics_id: songId,
			},
		});

		if (!data.lyrics) throw new Error('No lyrics found');

		return songLyricsResponseDto(data);
	}

	async getSongSuggestions({
		songId,
		limit = 10,
	}: GetSongSuggestions): Promise<z.infer<typeof songSchema>[]> {
		const stationId = await this.createSongStation(songId);

		const { data, ok } = await useFetch<z.infer<typeof songSuggestionAPIResponseSchema>>({
			endpoint: Endpoints.songs.suggestions,
			params: {
				stationid: stationId,
				k: limit,
			},
			context: 'android',
		});

		if (!data || !ok) {
			throw new Error('No suggestions found');
		}

		const { stationid: _stationid, ...suggestions } = data;

		return (
			Object.values(suggestions)
				.map(element => element && songResponseDto(element.song))
				.filter(Boolean)
				.slice(0, limit) || []
		);
	}

	private async createSongStation(songId: string): Promise<string> {
		const encodedSongId = JSON.stringify([encodeURIComponent(songId)]);

		const { data, ok } = await useFetch<{ stationid: string }>({
			endpoint: Endpoints.songs.station,
			params: {
				entity_id: encodedSongId,
				entity_type: 'queue',
			},
			context: 'android',
		});

		if (!data || !ok || !data.stationid) throw new Error('Failed to create song station');

		return data.stationid;
	}
}
