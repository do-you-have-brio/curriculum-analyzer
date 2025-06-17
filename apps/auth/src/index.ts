import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './error-handling';
import { routes } from './routes';

const app = new Hono();

app.use(logger());
app.use(cors());

app.route('/', routes);

app.onError(errorHandler);

export default {
	fetch: app.fetch,
	port: 4001,
};
