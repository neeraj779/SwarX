import { Router } from 'express';
import { AlbumController } from './album.controller';
import { zValidator } from '@/middleware/validation.middleware';
import { albumByIdOrLinkSchema } from './schemas/album.schema';

const router = Router();
const albumController = new AlbumController();

router.get('/', zValidator('query', albumByIdOrLinkSchema), albumController.getAlbumByIdOrLink);

export const albumRouter = router;
