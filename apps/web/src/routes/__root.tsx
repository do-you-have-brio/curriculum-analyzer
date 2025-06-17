import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
// app/routes/__root.tsx
import type { ReactNode } from 'react';
import { Header } from '@/components/header';
import appCss from '@/styles/app.css?url';

export const Route = createRootRoute({
	component: RootComponent,
	head: () => ({
		links: [
			{
				href: appCss,
				rel: 'stylesheet',
			},
		],
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				content: 'width=device-width, initial-scale=1',
				name: 'viewport',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
	}),
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Header />
				{children}
				<Scripts />
			</body>
		</html>
	);
}
