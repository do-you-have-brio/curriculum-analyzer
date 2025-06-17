import type { Context } from 'hono';

export async function proxyRequest(c: Context, targetServiceUrl: string) {
	const url = new URL(c.req.url);
	const targetUrl = `${targetServiceUrl}/${url.pathname.substring(c.req.routePath.length - 1)}${url.search}`;
	// auth/login?foo=bar -> ${authurl}/login?foo=bar

	console.log(`Proxying request from ${c.req.url} to ${targetUrl}`);

	const response = await fetch(targetUrl, {
		body: c.req.raw.body,
		headers: c.req.raw.headers,
		method: c.req.method,
	});

	// Create a new Hono Response from the Fetch API Response
	// This ensures headers, status, and body are correctly passed through
	const responseBody = await response.arrayBuffer();

	const honoResponse = new Response(responseBody, {
		headers: response.headers,
		status: response.status,
		statusText: response.statusText,
	});

	return honoResponse;
}
