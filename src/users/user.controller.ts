import { LogInterceptor } from '@/interceptors/log.interceptor';
import { UserService } from '@/users/user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { PatchUserDto } from 'src/users/dtos/patch-user.dto';
import { PutUserDto } from 'src/users/dtos/put-user.dto';

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
    async list (@Param('id', ParseIntPipe) id: number) {
        return this.userService.list(id)
    }

    @Patch(':id')
    async editOne (@Body() data: PatchUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id, data)
    }

    @Put(':id')
    async edit (@Body() data: PutUserDto, @Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id, data)
    }

    @Delete(':id')
    async delete (@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id)
    }
}
