import type { PrismaClient } from '@prisma/client';
import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { env } from './env';
import type { SignInDto, SignUpDto } from './schemas';

export class AuthService {
	constructor(private readonly prisma: PrismaClient) {}

	async signup(dto: SignInDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (user) {
			throw new HTTPException(409, {
				message: 'User already exists',
			});
		}

		const hashedPassword = await Bun.password.hash(dto.password);

		return this.prisma.user.create({
			data: {
				email: dto.email,
				password: hashedPassword,
			},
		});
	}

	async signin(dto: SignUpDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (!user) {
			throw new HTTPException(404, { message: 'User not found' });
		}

		const isPasswordValid = await Bun.password.verify(
			dto.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new Error('Invalid password');
		}

		const { password: _password, ...rest } = user;

		const token = await sign({ rest }, env.SECRET_KEY);

		return token;
	}
}
