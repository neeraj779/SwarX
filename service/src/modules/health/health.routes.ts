import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is up and running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Hello world endpoint
 *     description: Simple endpoint that returns a hello world message
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns hello world message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
router.get('/hello', (_req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

export const healthRouter = router;
