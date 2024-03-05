import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository : InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository
        sut = new CreateGymService(gymsRepository)
    })

    it('should be able to create gym', async () => {
        const { gym } = await sut.handle({
            title: 'Academia JavaScript',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})