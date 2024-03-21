import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeFetchUserCheckInHistoryService } from '@/services/factories/make-fetch-user-check-ins-history.service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)
        
        const fetchUserCheckInsHistoryService = makeFetchUserCheckInHistoryService()

        const { checkIns } = await fetchUserCheckInsHistoryService.execute({
            userId: request.user.sub,
            page
        })

    return reply.status(201).send({
        checkIns
    })
}