import { asyncHandler } from '@/middleware/error.middleware';
import { AlbumByIdOrLinkInput } from './schemas/album.schema';
import { albumService } from './album.service';

export class AlbumController {
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
