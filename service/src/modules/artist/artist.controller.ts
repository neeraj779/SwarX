import { asyncHandler } from '@/middleware/error.middleware';
import {
	ArtistByIdOrLinkInput,
	ArtistIdParamsInput,
	ArtistPaginatedQueryInput,
} from './schemas/artist-input.schema';
import { artistService } from './artist.service';

export class ArtistController {
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
