import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';

const router = Router();
const searchController = new SearchController();

router.get('/', searchController.searchAll);
router.get('/songs', searchController.searchSongs);
router.get('/albums', searchController.searchAlbums);
router.get('/artists', searchController.searchArtists);
router.get('/playlists', searchController.searchPlaylists);

export const searchRouter = router;
