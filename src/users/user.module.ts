import { UserController } from '@/users/user.controller';
import { UserService } from '@/users/user.service';
import { PrismaModule } from '@/prisma/prisma.module';

import { Module } from '@nestjs/common';


@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
