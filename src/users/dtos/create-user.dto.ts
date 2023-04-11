import { IsEmail, IsString, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
    @IsString()
    name: string

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1
    })
    password: string

    @IsEmail()
    email: string
}
