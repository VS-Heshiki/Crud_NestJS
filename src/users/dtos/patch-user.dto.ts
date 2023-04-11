import { CreateUserDto } from '@/users/dtos/create-user.dto'

import { PartialType } from '@nestjs/mapped-types'

export class PatchUserDto extends PartialType(CreateUserDto) {

}
