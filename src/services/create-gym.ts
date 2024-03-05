import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-respository"

interface CreateGymServiceRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymServiceResponse {
    gym: Gym
}

export class CreateGymService {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({
        title, description, phone, latitude, longitude
    }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return {
            gym
        }
    }
}