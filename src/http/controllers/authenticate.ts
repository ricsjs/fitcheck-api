import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentialError } from '@/services/errors/invalid-credential-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository
        const authenticateService = new AuthenticateService(prismaUsersRepository)

        await authenticateService.execute({
            email,
            password
        })

    } catch (error) {
        if (error instanceof InvalidCredentialError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }

    return reply.status(200).send()
}