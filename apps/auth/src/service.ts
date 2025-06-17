import type { PrismaClient } from '@prisma/client';
import { HTTPException } from 'hono/http-exception';
import { sign, verify } from 'hono/jwt';
import { env } from './env';
import type { SignInDto, SignUpDto } from './schemas';

export class AuthService {
	constructor(private readonly prisma: PrismaClient) {}

	async signup(dto: SignInDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (existingUser) {
			throw new HTTPException(409, {
				message: 'User already exists',
			});
		}

		const hashedPassword = await Bun.password.hash(dto.password);

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: hashedPassword,
			},
		});

		const { password: _password, ...rest } = user;

		return rest;
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

		const token = await sign(rest, env.JWT_SECRET);

		return token;
	}

	async verifyToken(token: string) {
		const isValid = await verify(token, env.JWT_SECRET);

		console.log(isValid);

		return isValid;
	}
}
