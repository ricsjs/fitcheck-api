import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let usersRepository : InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'ricfilho00000007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'ricfilho00000007@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'ricfilho00000007@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'ricfilho00000007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'ricfilho00000007@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })
})