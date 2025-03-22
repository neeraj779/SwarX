import { Router } from 'express';
import { healthRouter } from '@/routes/health.routes';

const router = Router();

router.use('/', healthRouter);

export const apiRouter = router;
