import { z } from 'zod';

export const downloadLinkSchema = z.object({
	quality: z.string(),
	url: z.string(),
});
