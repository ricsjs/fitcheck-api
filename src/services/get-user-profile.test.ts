import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-errors'

let usersRepository : InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const Createduser = await usersRepository.create({
            name: 'John Doe',
            email: 'ricfilho00000007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: Createduser.id
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => 
            sut.execute({
                userId: 'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})