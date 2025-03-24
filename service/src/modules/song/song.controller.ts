import { asyncHandler } from '@/middleware/error.middleware';
import {
	SongByIdsOrLinkInput,
	SongIdParamsInput,
	SongLyricsQueryInput,
	SongSuggestionsQueryInput,
} from './schemas/song.schema';
import { songService } from './song.service';

export class SongController {
	/**
	 * @swagger
	 * /songs:
	 *   get:
	 *     summary: Get songs by IDs or link
	 *     description: Retrieve songs using either a comma-separated list of song IDs or a JioSaavn song link
	 *     tags: [Songs]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: ids
	 *         schema:
	 *           type: string
	 *         description: Comma-separated list of song IDs
	 *       - in: query
	 *         name: link
	 *         schema:
	 *           type: string
	 *           format: uri
	 *         description: JioSaavn song URL
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved songs
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
	 *       400:
	 *         description: Invalid request parameters
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getSongByIdsOrLink = asyncHandler<{
		query: SongByIdsOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { ids, link } = req.query;

		const response = link
			? await songService.getSongByLink(link)
			: await songService.getSongByIds({ songIds: ids! });

		res.json({ success: true, data: response });
	});

	/**
	 * @swagger
	 * /songs/{id}:
	 *   get:
	 *     summary: Get song by ID
	 *     description: Retrieve detailed information about a specific song, optionally including lyrics
	 *     tags: [Songs]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Song ID
	 *       - in: query
	 *         name: lyrics
	 *         schema:
	 *           type: string
	 *           enum: ['true', 'false']
	 *         description: Include lyrics in the response
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved song details
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: boolean
	 *                   example: true
	 *                 data:
	 *                   $ref: '#/components/schemas/Song'
	 *       404:
	 *         description: Song not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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

	/**
	 * @swagger
	 * /songs/{id}/lyrics:
	 *   get:
	 *     summary: Get song lyrics
	 *     description: Retrieve lyrics for a specific song
	 *     tags: [Songs]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Song ID
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved song lyrics
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
	 *                     lyrics:
	 *                       type: string
	 *                     snippetLyrics:
	 *                       type: string
	 *       404:
	 *         description: Lyrics not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getSongLyrics = asyncHandler<{
		params: SongIdParamsInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;

		const lyrics = await songService.getSongLyrics(id);

		res.json({ success: true, data: lyrics });
	});

	/**
	 * @swagger
	 * /songs/{id}/suggestions:
	 *   get:
	 *     summary: Get song suggestions
	 *     description: Get suggested songs based on a specific song
	 *     tags: [Songs]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Song ID
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: Maximum number of suggestions to return
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved song suggestions
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
	 *       404:
	 *         description: Song not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
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
