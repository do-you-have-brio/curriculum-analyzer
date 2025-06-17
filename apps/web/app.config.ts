import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	tsr: {
		appDirectory: 'src',
	},
	vite: {
		plugins: [
			tailwindcss(),
			tsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
		],
	},
});
