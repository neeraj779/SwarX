import { asyncHandler } from '@/middleware/error.middleware';
import {
	ArtistByIdOrLinkInput,
	ArtistIdParamsInput,
	ArtistPaginatedQueryInput,
} from './schemas/artist-input.schema';
import { artistService } from './artist.service';

export class ArtistController {
	/**
	 * @swagger
	 * /artists:
	 *   get:
	 *     summary: Get artist by ID or link
	 *     description: Retrieve artist details using either an artist ID or a JioSaavn artist link
	 *     tags: [Artists]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: id
	 *         schema:
	 *           type: string
	 *         description: Artist ID
	 *       - in: query
	 *         name: link
	 *         schema:
	 *           type: string
	 *           format: uri
	 *         description: JioSaavn artist URL
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: songCount
	 *         schema:
	 *           type: string
	 *         description: Number of songs to return
	 *       - in: query
	 *         name: albumCount
	 *         schema:
	 *           type: string
	 *         description: Number of albums to return
	 *       - in: query
	 *         name: sortBy
	 *         schema:
	 *           type: string
	 *         description: Field to sort by
	 *       - in: query
	 *         name: sortOrder
	 *         schema:
	 *           type: string
	 *           enum: [asc, desc]
	 *         description: Sort order (ascending or descending)
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved artist details
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
	 *                     artist:
	 *                       type: object
	 *                     songs:
	 *                       type: array
	 *                     albums:
	 *                       type: array
	 *       400:
	 *         description: Invalid request parameters
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getArtistByIdOrLink = asyncHandler<{
		query: ArtistByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { link, id, page, sortBy, sortOrder, songCount, albumCount } = req.query;

		const response = link
			? await artistService.getArtistByLink({
					token: link,
					page,
					songCount,
					albumCount,
					sortBy,
					sortOrder,
				})
			: await artistService.getArtistById({
					artistId: id!,
					page,
					songCount,
					albumCount,
					sortBy,
					sortOrder,
				});

		res.json({ success: true, data: response });
	});

	/**
	 * @swagger
	 * /artists/{id}:
	 *   get:
	 *     summary: Get artist by ID
	 *     description: Retrieve detailed information about a specific artist
	 *     tags: [Artists]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Artist ID
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: songCount
	 *         schema:
	 *           type: string
	 *         description: Number of songs to return
	 *       - in: query
	 *         name: albumCount
	 *         schema:
	 *           type: string
	 *         description: Number of albums to return
	 *       - in: query
	 *         name: sortBy
	 *         schema:
	 *           type: string
	 *         description: Field to sort by
	 *       - in: query
	 *         name: sortOrder
	 *         schema:
	 *           type: string
	 *           enum: [asc, desc]
	 *         description: Sort order (ascending or descending)
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved artist details
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
	 *                     artist:
	 *                       type: object
	 *                     songs:
	 *                       type: array
	 *                     albums:
	 *                       type: array
	 *       404:
	 *         description: Artist not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getArtistById = asyncHandler<{
		params: ArtistIdParamsInput;
		query: ArtistByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;
		const { page, songCount, albumCount, sortBy, sortOrder } = req.query;

		const response = await artistService.getArtistById({
			artistId: id,
			page,
			songCount,
			albumCount,
			sortBy,
			sortOrder,
		});

		res.json({ success: true, data: response });
	});

	/**
	 * @swagger
	 * /artists/{id}/songs:
	 *   get:
	 *     summary: Get artist songs
	 *     description: Retrieve paginated list of songs by an artist
	 *     tags: [Artists]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Artist ID
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: sortBy
	 *         schema:
	 *           type: string
	 *         description: Field to sort by
	 *       - in: query
	 *         name: sortOrder
	 *         schema:
	 *           type: string
	 *           enum: [asc, desc]
	 *         description: Sort order (ascending or descending)
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved artist songs
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
	 *         description: Artist not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getArtistSongs = asyncHandler<{
		params: ArtistIdParamsInput;
		query: ArtistPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;
		const { page, sortBy, sortOrder } = req.query;

		const response = await artistService.getArtistSongs({
			artistId: id,
			page,
			sortBy,
			sortOrder,
		});

		res.json({ success: true, data: response });
	});

	/**
	 * @swagger
	 * /artists/{id}/albums:
	 *   get:
	 *     summary: Get artist albums
	 *     description: Retrieve paginated list of albums by an artist
	 *     tags: [Artists]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Artist ID
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: sortBy
	 *         schema:
	 *           type: string
	 *         description: Field to sort by
	 *       - in: query
	 *         name: sortOrder
	 *         schema:
	 *           type: string
	 *           enum: [asc, desc]
	 *         description: Sort order (ascending or descending)
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved artist albums
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
	 *       404:
	 *         description: Artist not found
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 */
	public getArtistAlbums = asyncHandler<{
		params: ArtistIdParamsInput;
		query: ArtistPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = req.params;
		const { page, sortBy, sortOrder } = req.query;

		const response = await artistService.getArtistAlbums({
			artistId: id,
			page,
			sortBy,
			sortOrder,
		});

		res.json({ success: true, data: response });
	});
}
