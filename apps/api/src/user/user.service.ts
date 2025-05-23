import type { PrismaClient } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import type {
	CreateEducationDto,
	CreateJobDto,
	UpdateUserDto,
} from "./user.dto";

export class UserService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		return user;
	}

	async updateUser(userId: string, data: UpdateUserDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				educations: {
					create: data.educations.create,
					update: data.educations.update.map((ed) => ({
						where: { id: ed.id },
						data: ed,
					})),
					deleteMany: data.educations.delete.map((id) => ({ id })),
				},
			},
			include: {
				educations: true,
			},
		});
	}

	async findAll() {
		return await this.prisma.user.findMany({
			include: {
				educations: true,
				jobs: true,
			},
		});
	}

	async addEducation(userId: string, data: CreateEducationDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				educations: {
					create: data,
				},
			},
			include: {
				educations: true,
			},
		});
	}

	async removeEducation(userId: string, educationId: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		const education = await this.prisma.education.findUnique({
			where: { id: educationId },
		});

		if (!education) {
			throw new HTTPException(404, { message: "Education not found" });
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				educations: {
					delete: { id: educationId },
				},
			},
			include: {
				educations: true,
			},
		});
	}

	async addJob(userId: string, data: CreateJobDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				jobs: {
					create: data,
				},
			},
			include: {
				jobs: true,
			},
		});
	}

	async removeJob(userId: string, jobId: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new HTTPException(404, { message: "User not found" });
		}

		const job = await this.prisma.job.findUnique({
			where: { id: jobId },
		});

		if (!job) {
			throw new HTTPException(404, { message: "Job not found" });
		}

		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				jobs: {
					delete: { id: jobId },
				},
			},
			include: {
				jobs: true,
			},
		});
	}
}
