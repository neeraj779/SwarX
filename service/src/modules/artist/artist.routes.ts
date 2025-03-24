import { Router } from 'express';
import { ArtistController } from './artist.controller';
import { zValidator } from '@/middleware/validation.middleware';
import {
	artistByIdOrLinkSchema,
	artistIdParamsSchema,
	artistPaginatedQuerySchema,
} from './schemas/artist-input.schema';

const router = Router();
const artistController = new ArtistController();

router.get('/', zValidator('query', artistByIdOrLinkSchema), artistController.getArtistByIdOrLink);

router.get(
	'/:id',
	zValidator('params', artistIdParamsSchema),
	zValidator('query', artistByIdOrLinkSchema),
	artistController.getArtistById,
);

router.get(
	'/:id/songs',
	zValidator('params', artistIdParamsSchema),
	zValidator('query', artistPaginatedQuerySchema),
	artistController.getArtistSongs,
);

router.get(
	'/:id/albums',
	zValidator('params', artistIdParamsSchema),
	zValidator('query', artistPaginatedQuerySchema),
	artistController.getArtistAlbums,
);

export const artistRouter = router;
