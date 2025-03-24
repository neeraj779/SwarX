import { ArtistService } from '@/modules/artist/artist.service';
import { asyncHandler } from '@/middleware/error.middleware';
import {
	ArtistByIdOrLinkInput,
	ArtistIdParamsInput,
	ArtistPaginatedQueryInput,
	artistByIdOrLinkSchema,
	artistIdParamsSchema,
	artistPaginatedQuerySchema,
} from './schemas/artist-input.schema';

export class ArtistController {
	private artistService: ArtistService;

	constructor() {
		this.artistService = new ArtistService();
	}

	public getArtistByIdOrLink = asyncHandler<{
		query: ArtistByIdOrLinkInput;
	}>(async (req, res): Promise<void> => {
		const {
			link,
			id,
			page = 0,
			sortBy = 'popularity',
			sortOrder = 'asc',
			songCount = 10,
			albumCount = 10,
		} = artistByIdOrLinkSchema.parse(req.query);

		if (!id && !link) {
			res.status(400).json({
				success: false,
				message: 'Either artist ID or link is required',
			});
			return;
		}

		const response = link
			? await this.artistService.getArtistByLink({
					token: link,
					page,
					songCount,
					albumCount,
					sortBy,
					sortOrder,
				})
			: await this.artistService.getArtistById({
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
		const { id } = artistIdParamsSchema.parse(req.params);
		const { page, songCount, albumCount, sortBy, sortOrder } = artistByIdOrLinkSchema.parse(
			req.query,
		);

		const response = await this.artistService.getArtistById({
			artistId: id,
			page: page || 0,
			songCount: songCount || 10,
			albumCount: albumCount || 10,
			sortBy: sortBy || 'popularity',
			sortOrder: sortOrder || 'asc',
		});

		res.json({ success: true, data: response });
	});

	public getArtistSongs = asyncHandler<{
		params: ArtistIdParamsInput;
		query: ArtistPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = artistIdParamsSchema.parse(req.params);
		const { page, sortBy, sortOrder } = artistPaginatedQuerySchema.parse(req.query);

		const response = await this.artistService.getArtistSongs({
			artistId: id,
			page: page || 0,
			sortBy: sortBy || 'popularity',
			sortOrder: sortOrder || 'desc',
		});

		res.json({ success: true, data: response });
	});

	public getArtistAlbums = asyncHandler<{
		params: ArtistIdParamsInput;
		query: ArtistPaginatedQueryInput;
	}>(async (req, res): Promise<void> => {
		const { id } = artistIdParamsSchema.parse(req.params);
		const { page, sortBy, sortOrder } = artistPaginatedQuerySchema.parse(req.query);

		const response = await this.artistService.getArtistAlbums({
			artistId: id,
			page: page || 0,
			sortBy: sortBy || 'popularity',
			sortOrder: sortOrder || 'desc',
		});

		res.json({ success: true, data: response });
	});
}
