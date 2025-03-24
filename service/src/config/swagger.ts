import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'SwarX API',
		version: '1.0.0',
		description: 'API documentation for SwarX',
	},
	servers: [
		{
			url: process.env.API_URL || '/api',
			description:
				process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
		},
	],
	components: {
		securitySchemes: {
			AccessToken: {
				type: 'apiKey',
				in: 'header',
				name: 'X-Access-Code',
				description: 'Access token for API authentication',
			},
		},
	},
};

const options: swaggerJSDoc.Options = {
	swaggerDefinition,
	apis: [
		'./src/routes/**/*.ts',
		'./src/modules/**/*.ts',
		'./src/modules/**/dto/*.ts',
		'./src/modules/**/types/*.ts',
		'./src/shared/types/*.ts',
	],
};

export const swaggerSpec = swaggerJSDoc(options);
