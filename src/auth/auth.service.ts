/* eslint-disable prettier/prettier */
// import { UsersService } from 'src/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private jwtService: JwtService) { }

    async signUp(signUpDto: SignUpDto) {
        try {
            const { name, email, role, password } = signUpDto;
            console.log('Creating user in the database');
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                name,
                email,
                role,
                password: hashedPassword,
            });
            console.log(user);
            const token = this.jwtService.sign({ id: user._id })

            return { token };
        } catch (err) {
            console.log(err)
        }

    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password, role } = loginDto;

        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new UnauthorizedException('User Not Found.')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid password.');
        }
        const token = this.jwtService.sign({ id: user._id })
        return { token };
    }

}
