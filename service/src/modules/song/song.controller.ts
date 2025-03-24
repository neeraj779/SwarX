import { asyncHandler } from '@/middleware/error.middleware';
import {
	SongByIdsOrLinkInput,
	SongIdParamsInput,
	SongLyricsQueryInput,
	SongSuggestionsQueryInput,
} from './schemas/song.schema';
import { songService } from './song.service';

export class SongController {
	public getSongByIdsOrLink = asyncHandler<{
		query: SongByIdsOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { ids, link } = req.query;

		const response = link
			? await songService.getSongByLink(link)
			: await songService.getSongByIds({ songIds: ids! });

		res.json({ success: true, data: response });
	});

	public getSongById = asyncHandler<{
		params: SongIdParamsInput;
		query: SongLyricsQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;
		const { lyrics } = req.query;

		const response = await songService.getSongByIds({
			songIds: id,
			includeLyrics: lyrics === 'true',
		});

		res.json({ success: true, data: response });
	});

	public getSongLyrics = asyncHandler<{
		params: SongIdParamsInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;

		const lyrics = await songService.getSongLyrics(id);

		res.json({ success: true, data: lyrics });
	});

	public getSongSuggestions = asyncHandler<{
		params: SongIdParamsInput;
		query: SongSuggestionsQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;
		const { limit } = req.query;

		const suggestions = await songService.getSongSuggestions({
			songId: id,
			limit,
		});

		res.json({ success: true, data: suggestions });
	});
}
