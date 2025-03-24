import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { swaggerSpec } from '../config/swagger.js';

try {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const outputPath = path.resolve(__dirname, '../../swagger.json');
	fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
} catch (error) {
	console.error('Error generating swagger.json:', error);
	process.exit(1);
}
