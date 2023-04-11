import { UserController } from '@/users/user.controller'
import { UserService } from '@/users/user.service'
import { PrismaModule } from '@/prisma/prisma.module'

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { VerifyIdMiddleware } from '@/middlewares/verify-id'


@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule {
    configure (consumer: MiddlewareConsumer) {
        consumer.apply(VerifyIdMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}
