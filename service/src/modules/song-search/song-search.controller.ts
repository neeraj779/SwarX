import { songSearchService } from './song-search.service';
import { asyncHandler } from '@/middleware/error.middleware';
import { SongSearchPaginatedQueryInput, SongSearchQueryInput } from './schemas/song-search.schema';

export class SongSearchController {
	/**
	 * @swagger
	 * /search:
	 *   get:
	 *     summary: Search across all content types
	 *     description: Search for songs, albums, artists, and playlists in one request
	 *     tags: [Search]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Search query string
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved search results
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   type: object
	 *                   properties:
	 *                     songs:
	 *                       type: array
	 *                       items:
	 *                         $ref: '#/components/schemas/Song'
	 *                     albums:
	 *                       type: array
	 *                       items:
	 *                         type: object
	 *                     artists:
	 *                       type: array
	 *                       items:
	 *                         type: object
	 *                     playlists:
	 *                       type: array
	 *                       items:
	 *                         type: object
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public searchAll = asyncHandler<{
		query: SongSearchQueryInput;
	}>(async (req, res): Promise<void> => {
		const response = await songSearchService.searchAll(req.query.query);
		res.json({ success: true, data: response });
	});

	/**
	 * @swagger
	 * /search/songs:
	 *   get:
	 *     summary: Search for songs
	 *     description: Search for songs with pagination support
	 *     tags: [Search]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Search query string
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: Number of results per page
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved song search results
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/Song'
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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

	/**
	 * @swagger
	 * /search/albums:
	 *   get:
	 *     summary: Search for albums
	 *     description: Search for albums with pagination support
	 *     tags: [Search]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Search query string
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: Number of results per page
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved album search results
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     properties:
	 *                       id:
	 *                         type: string
	 *                       name:
	 *                         type: string
	 *                       year:
	 *                         type: string
	 *                       songCount:
	 *                         type: number
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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

	/**
	 * @swagger
	 * /search/artists:
	 *   get:
	 *     summary: Search for artists
	 *     description: Search for artists with pagination support
	 *     tags: [Search]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Search query string
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: "Page number for pagination - defaults to 0"
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: "Number of results per page - defaults to 10"
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved artist search results
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     $ref: '#/components/schemas/ArtistMap'
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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

	/**
	 * @swagger
	 * /search/playlists:
	 *   get:
	 *     summary: Search for playlists
	 *     description: Search for playlists with pagination support
	 *     tags: [Search]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Search query string
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: Number of results per page
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved playlist search results
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   type: array
	 *                   items:
	 *                     type: object
	 *                     properties:
	 *                       id:
	 *                         type: string
	 *                       title:
	 *                         type: string
	 *                       description:
	 *                         type: string
	 *                       songCount:
	 *                         type: number
	 *                       fanCount:
	 *                         type: number
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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
