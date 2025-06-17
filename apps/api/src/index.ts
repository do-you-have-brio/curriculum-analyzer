import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';
import { proxyRequest } from './proxy';

const app = new Hono();

app.use(logger());
app.use('*', cors());

app.get('/_gateway/health', (c) => c.text('API Gateway is OK'));

app.all('auth/*', async (c) => {
	return proxyRequest(c, env.AUTH_SERVICE_URL);
});

// Fallback
app.all('*', (c) => c.json({ error: 'Route not found in gateway' }, 404));

export default {
	fetch: app.fetch,
	port: 4000,
};
