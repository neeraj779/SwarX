import { env } from '@/config/env';
import { swaggerSpec } from '@/config/swagger';
import { apiReference } from '@scalar/express-api-reference';
import { Router } from 'express';
import { readFileSync } from 'node:fs';

const router = Router();

router.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const file = readFileSync('./swagger.json', 'utf-8');
	if (env.NODE_ENV === 'production') {
		res.send(JSON.parse(file));
	}
	res.send(swaggerSpec);
});

router.use(
	'/api-docs',
	apiReference({
		theme: 'deepSpace',
		spec: {
			url: '/api/api-docs.json',
		},
		layout: 'modern',
		isEditable: false,
		showSidebar: true,
		darkMode: true,
		forceDarkModeState: 'dark',
		hideClientButton: true,
		metaData: {
			applicationName: 'SwarX API',
			author: 'Neeraj',
			creator: 'Neeraj',
			publisher: 'Neeraj',
			robots: 'index, follow',
		},
	}),
);

export const apiDocRouter = router;
