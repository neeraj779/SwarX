import { Router } from 'express';
import { PlaylistController } from './playlist.controller';
import { zValidator } from '@/middleware/validation.middleware';
import { playlistByIdOrLinkSchema } from './schemas/playlist.schema';

const router = Router();
const playlistController = new PlaylistController();

router.get(
	'/',
	zValidator('query', playlistByIdOrLinkSchema),
	playlistController.getPlaylistByIdOrLink,
);

export const playlistRouter = router;
