import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-respository";
import { ResourceNotFoundError } from "./errors/resource-not-found-errors";

interface CheckInServiceRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}

export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // calcular distância entre o usuário e a academia

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )

        if (checkInOnSameDate) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })
        
        return {
            checkIn
        }
    }
}