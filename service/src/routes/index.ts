import { Router } from 'express';
import { healthRouter } from '@/modules/health/health.routes';
import { songRouter } from '@/modules/song/song.routes';
import { albumRouter } from '@/modules/album/album.routes';
import { artistRouter } from '@/modules/artist/artist.routes';
import { songSearchRouter } from '@/modules/song-search/song-search.routes';
import { playlistRouter } from '@/modules/playlist/playlist.routes';

const router = Router();

router.use('/', healthRouter);
router.use('/songs', songRouter);
router.use('/albums', albumRouter);
router.use('/artists', artistRouter);
router.use('/search', songSearchRouter);
router.use('/playlists', playlistRouter);

export const apiRouter = router;
