import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/')({
	component: Home,
});

const formSchema = z.object({
	description: z.string().min(2, {
		message: 'Description must be at least 20 characters.',
	}),
});

function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			description: '',
		},
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="p-8 flex flex-col">
			<Form {...form}>
				<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Job description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Company is a solution provider that aims to revolutionize the accounts payable department of traditional businesses in Brazil. By automating payment processes, Company offers efficiency, time savings, and convenience to entrepreneurs. Through a simple platform, clients can make one payment a day and have Company take care of the rest, including handling boletos, PIX, DARF, and more.
Role Description
This is a full-time remote role for a Full Stack Engineer at Company. The Full Stack Engineer will be responsible for both front-end and back-end web development tasks.
Current Stack
Node.js
React
Phyton"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
