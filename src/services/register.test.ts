import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.handle({
            name: 'Ricardo',
            email: 'ricfilho00000007@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerService = new RegisterService(usersRepository)

        const { user } = await registerService.handle({
            name: 'Ricardo',
            email: 'ricfilho007@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerService = new RegisterService(usersRepository)

        const email = 'ricfilho0007@gmail.com'

        await registerService.handle({
            name: 'Ricardo',
            email,
            password: '123456'
        })

        expect(() => 
            registerService.handle({
                name: 'Ricardo',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})