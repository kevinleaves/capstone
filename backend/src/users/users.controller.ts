import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
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
}
