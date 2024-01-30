/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        console.log(signUpDto, "dto")
        return await this.authService.signUp(signUpDto);
    }

    @Get('/login')
    @UseGuards(new LoginGuard())
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}
