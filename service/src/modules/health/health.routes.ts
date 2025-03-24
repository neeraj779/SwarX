import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

router.get('/hello', (_req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

export const healthRouter = router;
