import { downloadLinkSchema } from '@/shared/schemas/download.schema';
import { z } from 'zod';

export const artistMapAPIResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	role: z.string(),
	type: z.string(),
	image: z.string(),
	perma_url: z.string(),
});

export const artistMapSchema = z.object({
	id: z.string(),
	name: z.string(),
	role: z.string(),
	type: z.string(),
	image: z.array(downloadLinkSchema),
	url: z.string(),
});
