import { Router } from 'express';
import { AlbumController } from '../controllers/album.controller';

const router = Router();
const albumController = new AlbumController();

router.get('/', albumController.getAlbumByIdOrLink);

export const albumRouter = router;
