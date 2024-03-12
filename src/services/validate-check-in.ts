import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-errors";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

interface CheckInValidateServiceRequest {
    checkInId: string
}

interface CheckInValidateServiceResponse {
    checkIn: CheckIn
}

export class CheckInValidateService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ checkInId }: CheckInValidateServiceRequest): Promise<CheckInValidateServiceResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}