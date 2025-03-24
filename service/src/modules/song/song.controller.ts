import { asyncHandler } from '@/middleware/error.middleware';
import {
	SongByIdsOrLinkInput,
	SongIdParamsInput,
	SongLyricsQueryInput,
	SongSuggestionsQueryInput,
	songByIdsOrLinkSchema,
	songIdParamsSchema,
	songLyricsQuerySchema,
	songSuggestionsQuerySchema,
} from './schemas/song.schema';
import { SongService } from './song.service';

export class SongController {
	private songService: SongService;

	constructor() {
		this.songService = new SongService();
	}

	public getSongByIdsOrLink = asyncHandler<{
		query: SongByIdsOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { ids, link } = songByIdsOrLinkSchema.parse(req.query);

		if (!link && !ids) {
			res.status(400).json({
				success: false,
				message: 'Either song IDs or link is required',
			});
			return;
		}

		const response = link
			? await this.songService.getSongByLink(link)
			: await this.songService.getSongByIds({ songIds: ids! });

		res.json({ success: true, data: response });
	});

	public getSongById = asyncHandler<{
		params: SongIdParamsInput;
		query: SongLyricsQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = songIdParamsSchema.parse(req.params);
		const { lyrics } = songLyricsQuerySchema.parse(req.query);

		const response = await this.songService.getSongByIds({
			songIds: id,
			includeLyrics: lyrics === 'true',
		});

		res.json({ success: true, data: response });
	});

	public getSongLyrics = asyncHandler<{
		params: SongIdParamsInput;
	}>(async (req, res): Promise<void> => {
		const { id } = songIdParamsSchema.parse(req.params);

		const lyrics = await this.songService.getSongLyrics(id);

		res.json({ success: true, data: lyrics });
	});

	public getSongSuggestions = asyncHandler<{
		params: SongIdParamsInput;
		query: SongSuggestionsQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = songIdParamsSchema.parse(req.params);
		const { limit } = songSuggestionsQuerySchema.parse(req.query);

		const suggestions = await this.songService.getSongSuggestions({
			songId: id,
			limit: limit || 10,
		});

		res.json({ success: true, data: suggestions });
	});
}
