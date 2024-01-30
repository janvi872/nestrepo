/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class SignUpDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter correct email." })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    role: string;

}