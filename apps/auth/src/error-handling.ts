import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

export function errorHandler(err: Error, c: Context) {
	console.log(err);

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	if (err instanceof SyntaxError) {
		return c.json({ message: 'No body' }, 400);
	}

	if (err instanceof ZodError) {
		return c.json({ message: err }, 400);
	}

	return c.json({ message: err }, 500);
}
