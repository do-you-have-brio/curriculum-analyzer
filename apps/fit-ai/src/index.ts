import amqplib from 'amqplib';
import { env } from './env';

(async () => {
	const queue = 'analyze';
	const conn = await amqplib.connect(env.RABBIT_URL);
	console.log('[INFO] Connected to rabbitmq');

	const channel = await conn.createChannel();
	await channel.assertQueue(queue);

	channel.consume(queue, (msg) => {
		if (msg !== null) {
			console.log('Received:', msg.content.toString());
			channel.ack(msg);
		} else {
			console.log('Consumer cancelled by server');
		}
	});
})();
