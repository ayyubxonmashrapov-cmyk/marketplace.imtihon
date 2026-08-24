import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator'

export class AdminDto{
    @ApiProperty({
        type : String,
        default : '+998901876965',
        description : 'uz phone number'
    })
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone !: string

    @ApiProperty({
        type : String,
        default : 'Hehnimadur!0',
        description : 'password'
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password !: string
}