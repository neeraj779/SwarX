import { asyncHandler } from '@/middleware/error.middleware';
import { AlbumService } from './album.service';
import { AlbumByIdOrLinkInput, albumByIdOrLinkSchema } from './schemas/album.schema';

export class AlbumController {
	private albumService: AlbumService;

	constructor() {
		this.albumService = new AlbumService();
	}

	public getAlbumByIdOrLink = asyncHandler<{
		query: AlbumByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const { id, link } = albumByIdOrLinkSchema.parse(req.query);

		if (!id && !link) {
			res.status(400).json({
				success: false,
				message: 'Either album ID or link is required',
			});
			return;
		}

		const response = link
			? await this.albumService.getAlbumByLink(link)
			: await this.albumService.getAlbumById(id!);

		res.json({ success: true, data: response });
	});
}
