import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator'

export class CreateAdminDto{
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone !: string

    @IsStrongPassword()
    @IsNotEmpty()
    password !: string
}