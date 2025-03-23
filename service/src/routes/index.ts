import { Router } from 'express';
import { healthRouter } from '@/routes/health.routes';
import { songRouter } from '@/routes/song.routes';
import { albumRouter } from '@/routes/album.routes';
import { artistRouter } from '@/routes/artist.routes';
import { searchRouter } from '@/routes/search.routes';
import { playlistRouter } from '@/routes/playlist.routes';

const router = Router();

router.use('/', healthRouter);
router.use('/songs', songRouter);
router.use('/albums', albumRouter);
router.use('/artists', artistRouter);
router.use('/search', searchRouter);
router.use('/playlists', playlistRouter);

export const apiRouter = router;
