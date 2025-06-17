import { GoogleGenAI } from '@google/genai';
import { write } from 'bun';
import { Hono } from 'hono';
import { ZodError } from 'zod';
import { env } from './env';
import { analyzeSchema } from './schemas';

export const routes = new Hono();

const ai = new GoogleGenAI({ apiKey: env.API_KEY });

routes.post('/analyze', async (c) => {
	try {
		const { job, profile } = analyzeSchema.parse(await c.req.json());

		const prompt = `
  You are an AI assistant helping to match candidates to job descriptions.

  User profile:
  Education: ${JSON.stringify(profile.education)}
  Experience: ${JSON.stringify(profile.jobs)}
  Projects: ${JSON.stringify(profile.repositories)}

  Job description:
  ${job.description}

  Analyze the fit between this profile and job. Respond with a JSON like:
  {
    "match": %,
    "missingSkills": [...],
    "summary": "short explanation"
  }
  `;

		write('prompt.txt', prompt);

		const completion = await ai.models.generateContent({
			contents: prompt,
			model: 'gemini-2.0-flash',
		});

		console.log(completion);

		return c.json(completion);
	} catch (error) {
		if (error instanceof ZodError) {
			return c.json({ error: error.errors }, 400);
		}

		console.error(error);

		return c.json({ error: error }, 400);
	}
});
