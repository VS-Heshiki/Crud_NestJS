import { PrismaService } from '@/prisma/prisma.service'
import { CreateUserDto } from '@/users/dtos/create-user.dto'
import { PatchUserDto } from '@/users/dtos/patch-user.dto'
import { PutUserDto } from '@/users/dtos/put-user.dto'

import { Injectable, NotFoundException } from '@nestjs/common'


@Injectable()
export class UserService {
    constructor (private readonly prisma: PrismaService) { }

    async create ({ name, email, password }: CreateUserDto) {
        return this.prisma
            .users
            .create({
                data: { name, email, password },
                select: { id: true }
            })
    }

    async list (id?: number) {
        if (id === undefined) {
            return this.prisma
                .users
                .findMany()
        } else {
            await this.idExist(id)
            return this.prisma
                .users
                .findUnique({
                    where: { id }
                })
        }
    }

    async update (id: number, data: PatchUserDto | PutUserDto) {
        await this.idExist(id)

        if (typeof data === typeof PutUserDto) {
            await this.prisma.users.update({
                data,
                where: { id }
            })
        } else {
            await this.prisma.users.updateMany({
                data,
                where: { id }
            })
        }

        return await this.prisma
            .users
            .findUnique({
                where: { id }
            })
    }

    async delete (id: number) {
        await this.idExist(id)
        return this.prisma.users.delete({
            where: { id }
        })
    }

    async idExist (id: number) {
        const validId = await this.prisma
            .users
            .findUnique({
                where: { id }
            })

        if (!validId) {
            throw new NotFoundException(`The id:${id} not exists`)
        }
    }
}
