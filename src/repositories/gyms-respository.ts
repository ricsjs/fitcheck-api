import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    fyndManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
    findByName(gymName: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}