import { SearchService } from '@/services/search.service';
import { asyncHandler } from '@/middleware/error.middleware';
import {
	SearchPaginatedQueryInput,
	SearchQueryInput,
	searchPaginatedQuerySchema,
	searchQuerySchema,
} from '@/schemas/search.schema';

export class SearchController {
	private searchService: SearchService;

	constructor() {
		this.searchService = new SearchService();
	}

	public searchAll = asyncHandler<{
		query: SearchQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query } = searchQuerySchema.parse(req.query);

		const response = await this.searchService.searchAll(query);

		res.json({ success: true, data: response });
	});

	public searchSongs = asyncHandler<{
		query: SearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchSongs({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchAlbums = asyncHandler<{
		query: SearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchAlbums({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchArtists = asyncHandler<{
		query: SearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchArtists({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});

	public searchPlaylists = asyncHandler<{
		query: SearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = searchPaginatedQuerySchema.parse(req.query);

		const response = await this.searchService.searchPlaylists({
			query,
			page: page || 0,
			limit: limit || 10,
		});

		res.json({ success: true, data: response });
	});
}
