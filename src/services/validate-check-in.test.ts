import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInValidateService } from './validate-check-in'
import exp from 'constants'
import { ResourceNotFoundError } from './errors/resource-not-found-errors'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInValidateService

describe('Validate Check-In Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository
        sut = new CheckInValidateService(checkInsRepository)

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() =>
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
})
