import { asyncHandler } from '@/middleware/error.middleware';
import { PlaylistByIdOrLinkInput, playlistByIdOrLinkSchema } from './schemas/playlist.schema';
import { PlaylistService } from './playlist.service';

export class PlaylistController {
	private playlistService: PlaylistService;

	constructor() {
		this.playlistService = new PlaylistService();
	}

	public getPlaylistByIdOrLink = asyncHandler<{
		query: PlaylistByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { id, link, page, limit } = playlistByIdOrLinkSchema.parse(req.query);

		if (!id && !link) {
			res.status(400).json({
				success: false,
				message: 'Either playlist ID or link is required',
			});
			return;
		}

		const response = link
			? await this.playlistService.getPlaylistByLink({
					token: link,
					page: page || 0,
					limit: limit || 10,
				})
			: await this.playlistService.getPlaylistById({
					id: id!,
					page: page || 0,
					limit: limit || 10,
				});

		res.json({ success: true, data: response });
	});
}
