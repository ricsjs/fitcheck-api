import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { create } from "./create"
import { history } from "./history"
import { validate } from "./validate"
import { metrics } from "./metrics"

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/metrics', metrics)
    app.get('/check-ins/history', history)
    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', validate)
}