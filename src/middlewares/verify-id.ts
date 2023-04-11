import { BadRequestException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class VerifyIdMiddleware implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        const idParams = req.params.id

        if (isNaN(Number(idParams)) || Number(idParams) <= 0) {
            throw new BadRequestException(`Id:${idParams} is invalid!`)
        }

        next()
    }
}
