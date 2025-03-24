import { asyncHandler } from '@/middleware/error.middleware';
import { PlaylistByIdOrLinkInput } from './schemas/playlist.schema';
import { playlistService } from './playlist.service';

export class PlaylistController {
	/**
	 * @swagger
	 * /playlists:
	 *   get:
	 *     summary: Get playlist by ID or link
	 *     description: Retrieve playlist details using either a playlist ID or a JioSaavn playlist link
	 *     tags: [Playlists]
	 *     security:
	 *       - AccessToken: []
	 *     parameters:
	 *       - in: query
	 *         name: id
	 *         schema:
	 *           type: string
	 *         description: Playlist ID
	 *       - in: query
	 *         name: link
	 *         schema:
	 *           type: string
	 *           format: uri
	 *         description: JioSaavn playlist URL
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: string
	 *         description: Page number for pagination
	 *       - in: query
	 *         name: limit
	 *         schema:
	 *           type: string
	 *         description: Number of songs to return per page
	 *     responses:
	 *       200:
	 *         description: Successfully retrieved playlist details
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
	 *                       description: Playlist ID
	 *                     title:
	 *                       type: string
	 *                       description: Playlist title
	 *                     description:
	 *                       type: string
	 *                       description: Playlist description
	 *                     songCount:
	 *                       type: number
	 *                       description: Total number of songs in the playlist
	 *                     fanCount:
	 *                       type: number
	 *                       description: Number of fans/followers
	 *                     songs:
	 *                       type: array
	 *                       items:
	 *                         $ref: '#/components/schemas/Song'
	 *                     image:
	 *                       type: array
	 *                       items:
	 *                         $ref: '#/components/schemas/DownloadLink'
	 *       400:
	 *         description: Invalid request parameters
	 *       401:
	 *         description: Unauthorized - Invalid or missing access token
	 *       404:
	 *         description: Playlist not found
	 */
	public getPlaylistByIdOrLink = asyncHandler<{
		query: PlaylistByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { id, link, page, limit } = req.query;

		const response = link
			? await playlistService.getPlaylistByLink({
					token: link,
					page,
					limit,
				})
			: await playlistService.getPlaylistById({
					id: id!,
					page,
					limit,
				});

		res.json({ success: true, data: response });
	});
}
