import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credential-error'

describe('Authenticate Service', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateService(usersRepository)

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
        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateService(usersRepository)

        expect(() => 
            sut.execute({
                email: 'ricfilho00000007@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository
        const sut = new AuthenticateService(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'ricfilho00000007@gmail.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => 
            sut.execute({
                email: 'ricfilho00000007@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialError)
    })
})