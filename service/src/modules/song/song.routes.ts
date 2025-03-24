import { Router } from 'express';
import { SongController } from './song.controller';

const router = Router();
const songController = new SongController();

router.get('/', songController.getSongByIdsOrLink);
router.get('/:id', songController.getSongById);
router.get('/:id/lyrics', songController.getSongLyrics);
router.get('/:id/suggestions', songController.getSongSuggestions);

export const songRouter = router;
