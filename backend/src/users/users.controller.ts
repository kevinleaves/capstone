import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // inject service
  constructor(private usersService: UsersService) {}

  @Post('/register')
  createUser(@Body() body: CreateUserDto) {
    const { email, password, firstName, lastName } = body;

    void this.usersService.create(email, password, firstName, lastName);
  }

  @Get('/')
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Patch(':id')
  updateUserById(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
