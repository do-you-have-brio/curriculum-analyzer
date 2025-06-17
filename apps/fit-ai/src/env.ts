import { z } from 'zod';

export const envSchema = z.object({
	// API_KEY: z.string(),
	RABBIT_URL: z.string(),
	SECRET_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
