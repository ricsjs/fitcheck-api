import { FetchNearbyGymsService } from "../fetch-nearby-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsService() {
    const gymsRepository = new PrismaGymsRepository
    const useCase = new FetchNearbyGymsService(gymsRepository)

    return useCase
}