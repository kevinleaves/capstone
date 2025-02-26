import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  // inject repository
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, firstName: string, lastName: string) {
    const user = this.repo.create({
      email,
      password,
      firstName,
      lastName,
    });

    // save new user
    return this.repo.save(user);
  }
}
