import { z } from 'zod';

export const analyzeSchema = z.object({
	job: z.object({
		description: z.string(),
	}),
	profile: z.object({
		education: z.array(z.any()),
		jobs: z.array(z.any()),
		repositories: z.array(z.any()),
	}),
});
