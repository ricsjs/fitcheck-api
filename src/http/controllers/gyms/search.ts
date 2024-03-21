import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        gymName: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { gymName, page } = searchGymsQuerySchema.parse(request.query)
        
        const searchGymsService = makeSearchGymsService()

        const { gyms } = await searchGymsService.handle({
            gymName,
            page
        })

    return reply.status(200).send({
        gyms
    })
}