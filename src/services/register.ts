import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {
    }

    async handle({
        name,
        email,
        password
    } : RegisterServiceRequest) {
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new Error('E-mail already exists')
        }
    
        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
}