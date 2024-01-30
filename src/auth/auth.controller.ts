/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginGuard } from './guards/login.guard';
import { Role, RoleAllowed } from './decorator/role-allowed';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        console.log(signUpDto, "dto")
        return await this.authService.signUp(signUpDto);
    }

    @Get('/login')
    @UseGuards(LoginGuard)
    @RoleAllowed([Role.ADMIN])
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return await this.authService.login(loginDto);
    }
}
