import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
	return (
		<div className="w-full p-2 border-b">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	);
}
