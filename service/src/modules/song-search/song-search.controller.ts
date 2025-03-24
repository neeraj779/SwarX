import { songSearchService } from './song-search.service';
import { asyncHandler } from '@/middleware/error.middleware';
import { SongSearchPaginatedQueryInput, SongSearchQueryInput } from './schemas/song-search.schema';

export class SongSearchController {
	public searchAll = asyncHandler<{
		query: SongSearchQueryInput;
	}>(async (req, res): Promise<void> => {
		const response = await songSearchService.searchAll(req.query.query);
		res.json({ success: true, data: response });
	});

	public searchSongs = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = req.query;
		const response = await songSearchService.searchSongs({
			query,
			page,
			limit,
		});
		res.json({ success: true, data: response });
	});

	public searchAlbums = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = req.query;
		const response = await songSearchService.searchAlbums({
			query,
			page,
			limit,
		});
		res.json({ success: true, data: response });
	});

	public searchArtists = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page = '0', limit = '10' } = req.query;
		const response = await songSearchService.searchArtists({
			query,
			page,
			limit,
		});
		res.json({ success: true, data: response });
	});

	public searchPlaylists = asyncHandler<{
		query: SongSearchPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { query, page, limit } = req.query;
		const response = await songSearchService.searchPlaylists({
			query,
			page,
			limit,
		});
		res.json({ success: true, data: response });
	});
}
