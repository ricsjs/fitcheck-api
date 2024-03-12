import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-respository"

interface FetchNearbyGymsServiceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsService {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({
        userLatitude, userLongitude
    }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {

        const gyms = await this.gymsRepository.fyndManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}