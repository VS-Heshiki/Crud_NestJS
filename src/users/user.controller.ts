import { LogInterceptor } from '@/interceptors/log.interceptor'
import { UserService } from '@/users/user.service'
import { CreateUserDto } from '@/users/dtos/create-user.dto'
import { PatchUserDto } from '@/users/dtos/patch-user.dto'
import { PutUserDto } from '@/users/dtos/put-user.dto'

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common'
import { ParamsId } from '@/decorators/params-id'

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
    constructor (private readonly userService: UserService) { }

    @Post()
    async create (@Body() data: CreateUserDto) {
        return this.userService.create(data)
    }

    @Get()
    async listAll () {
        return this.userService.list()
    }

    @Get(':id')
    async list (@ParamsId() id: number) {
        return this.userService.list(id)
    }

    @Patch(':id')
    async editOne (@Body() data: PatchUserDto, @ParamsId() id: number) {
        return this.userService.update(id, data)
    }

    @Put(':id')
    async edit (@Body() data: PutUserDto, @ParamsId() id: number) {
        return this.userService.update(id, data)
    }

    @Delete(':id')
    async delete (@ParamsId() id) {
        return this.userService.delete(id)
    }
}
