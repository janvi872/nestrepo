/* eslint-disable prettier/prettier */
import { CreateUserDTO } from 'src/users/dto/createUserDto';
import { Controller, Delete, Get, Put, Param, Post, Body, BadRequestException } from "@nestjs/common";
import { UsersService } from 'src/users/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  async findAll() {
    return this.usersService.findAll();
  }

  // @Get('/login')
  // async getUserByUserName(@Body() userName: any) {
  //   return this.usersService.getUserByUserName(userName.name);
  // }


  @Post('/add')
  async create(@Body() createUserDto: CreateUserDTO) {
    const user = this.usersService.create(createUserDto);
    if (user) {
      return user;
    } else {
      throw new BadRequestException("user  not inserted");
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() body: CreateUserDTO) {
    return await this.usersService.update(id, body);
  }
}