import { Router } from 'express';
import { SongController } from './song.controller';
import { zValidator } from '@/middleware/validation.middleware';
import {
	songByIdsOrLinkSchema,
	songIdParamsSchema,
	songLyricsQuerySchema,
	songSuggestionsQuerySchema,
} from './schemas/song.schema';

const router = Router();
const songController = new SongController();

router.get('/', zValidator('query', songByIdsOrLinkSchema), songController.getSongByIdsOrLink);

router.get(
	'/:id',
	zValidator('params', songIdParamsSchema),
	zValidator('query', songLyricsQuerySchema),
	songController.getSongById,
);

router.get('/:id/lyrics', zValidator('params', songIdParamsSchema), songController.getSongLyrics);

router.get(
	'/:id/suggestions',
	zValidator('params', songIdParamsSchema),
	zValidator('query', songSuggestionsQuerySchema),
	songController.getSongSuggestions,
);

export const songRouter = router;
