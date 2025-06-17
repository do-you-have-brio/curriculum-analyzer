import { z } from 'zod';

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
});

export type SignInDto = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
});

export type SignUpDto = z.infer<typeof signupSchema>;

export const verifySchema = z.object({
	token: z.string(),
});

export type VerifyDto = z.infer<typeof verifySchema>;
