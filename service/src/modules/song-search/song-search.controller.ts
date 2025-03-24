import { SearchService } from './song-search.service';
import { asyncHandler } from '@/middleware/error.middleware';
import {
	SongSearchPaginatedQueryInput,
	SongSearchQueryInput,
	songSearchPaginatedQuerySchema,
	songSearchQuerySchema,
} from './schemas/song-search.schema';

export class SongSearchController {
	private searchService: SearchService;

	constructor() {
		this.searchService = new SearchService();
	}

	public searchAll = asyncHandler<{
		query: SongSearchQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query } = songSearchQuerySchema.parse(req.query);

		const response = await this.searchService.searchAll(query);

		res.json({ success: true, data: response });
	});

	public searchSongs = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = songSearchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchSongs({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchAlbums = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = songSearchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchAlbums({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchArtists = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = songSearchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchArtists({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchPlaylists = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = songSearchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchPlaylists({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});
}
