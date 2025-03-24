import { Router } from 'express';
import { SongSearchController } from './song-search.controller';
import { zValidator } from '@/middleware/validation.middleware';
import {
	songSearchPaginatedQuerySchema,
	songSearchQuerySchema,
} from './schemas/song-search.schema';

const router = Router();
const songSearchController = new SongSearchController();

router.get('/', zValidator('query', songSearchQuerySchema), songSearchController.searchAll);

router.get(
	'/songs',
	zValidator('query', songSearchPaginatedQuerySchema),
	songSearchController.searchSongs,
);

router.get(
	'/albums',
	zValidator('query', songSearchPaginatedQuerySchema),
	songSearchController.searchAlbums,
);

router.get(
	'/artists',
	zValidator('query', songSearchPaginatedQuerySchema),
	songSearchController.searchArtists,
);

router.get(
	'/playlists',
	zValidator('query', songSearchPaginatedQuerySchema),
	songSearchController.searchPlaylists,
);

export const songSearchRouter = router;
