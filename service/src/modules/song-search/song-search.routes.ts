import { Router } from 'express';
import { SongSearchController } from './song-search.controller';

const router = Router();
const songSearchController = new SongSearchController();

router.get('/', songSearchController.searchAll);
router.get('/songs', songSearchController.searchSongs);
router.get('/albums', songSearchController.searchAlbums);
router.get('/artists', songSearchController.searchArtists);
router.get('/playlists', songSearchController.searchPlaylists);

export const searchRouter = router;
