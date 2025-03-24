import { asyncHandler } from '@/middleware/error.middleware';
import { PlaylistByIdOrLinkInput } from './schemas/playlist.schema';
import { playlistService } from './playlist.service';

export class PlaylistController {
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
