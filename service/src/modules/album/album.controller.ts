import { asyncHandler } from '@/middleware/error.middleware';
import { AlbumByIdOrLinkInput } from './schemas/album.schema';
import { albumService } from './album.service';

export class AlbumController {
	/**
	 * @swagger
	 * /albums:
	 *   get:
	 *     summary: Get album by ID or link
	 *     description: Retrieve album details using either an album ID or a JioSaavn album link
	 *     tags: [Albums]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: id
	 *         schema:
	 *           type: string
	 *         description: Album ID
	 *       - in: query
	 *         name: link
	 *         schema:
	 *           type: string
	 *           format: uri
	 *         description: JioSaavn album URL
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved album details
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
	 *                     id:
	 *                       type: string
	 *                       description: Album ID
	 *                     name:
	 *                       type: string
	 *                       description: Album name
	 *                     year:
	 *                       type: string
	 *                       description: Release year
	 *                     songCount:
	 *                       type: number
	 *                       description: Number of songs in the album
	 *                     primaryArtists:
	 *                       type: array
	 *                       items:
	 *                         $ref: '#/components/schemas/ArtistMap'
	 *                     songs:
	 *                       type: array
	 *                       items:
	 *                         $ref: '#/components/schemas/Song'
	 *       400:
	 *         description: Invalid request parameters
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 *       404:
	 *         description: Album not found
	 */
	public getAlbumByIdOrLink = asyncHandler<{
		query: AlbumByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { id, link } = req.query;

		const response = link
			? await albumService.getAlbumByLink(link)
			: await albumService.getAlbumById(id!);

		res.json({ success: true, data: response });
	});
}
