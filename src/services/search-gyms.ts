import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-respository"

interface SearchGymServiceRequest {
    gymName: string
    page: number
}

interface SearchGymServiceResponse {
    gyms: Gym[]
}

export class SearchGymService {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({
        gymName, page
    }: SearchGymServiceRequest): Promise<SearchGymServiceResponse> {

        const gyms = await this.gymsRepository.findByName(gymName, page)

        return {
            gyms
        }
    }
}