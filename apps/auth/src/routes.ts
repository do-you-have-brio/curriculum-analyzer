import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { signinSchema, signupSchema } from './schemas';
import { AuthService } from './service';

export const routes = new Hono();

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

routes.post('/login', async (c) => {
	const { email, password } = signinSchema.parse(await c.req.json());

	const res = await authService.signin({ email, password });

	return c.json({ token: res });
});

routes.post('/register', async (c) => {
	const { email, password } = signupSchema.parse(await c.req.json());
	const res = await authService.signup({ email, password });
	return c.json(res);
});

routes.get('/verify', async (c) => {
	const [, token] = c.req.header().authorization.split(' ');

	const res = await authService.verifyToken(token);

	return c.json(res);
});
