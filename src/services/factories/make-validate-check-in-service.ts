import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInValidateService } from "../validate-check-in"

export function makeValidateCheckInService() {
    const checkInsRepository = new PrismaCheckInsRepository
    const useCase = new CheckInValidateService(checkInsRepository)

    return useCase
}