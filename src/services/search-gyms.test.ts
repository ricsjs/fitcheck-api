import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gyms service', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository
        sut = new SearchGymService(gymsRepository)
    })


    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        const { gyms } = await sut.handle({
            gymName: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ])
    })

    it('should be able to fetch paginated gym search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
        }

        const { gyms } = await sut.handle({
            gymName: 'JavaScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' }),
        ])
    })
})
