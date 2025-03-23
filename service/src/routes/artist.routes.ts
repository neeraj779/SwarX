import { Router } from 'express';
import { ArtistController } from '../controllers/artist.controller';

const router = Router();
const artistController = new ArtistController();

router.get('/', artistController.getArtistByIdOrLink);
router.get('/:id', artistController.getArtistById);
router.get('/:id/songs', artistController.getArtistSongs);
router.get('/:id/albums', artistController.getArtistAlbums);

export const artistRouter = router;
