import { z } from 'zod';

export const envSchema = z.object({
	AUTH_SERVICE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
