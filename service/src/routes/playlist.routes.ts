import { Router } from 'express';
import { PlaylistController } from '../controllers/playlist.controller';

const router = Router();
const playlistController = new PlaylistController();

router.get('/', playlistController.getPlaylistByIdOrLink);

export const playlistRouter = router;
