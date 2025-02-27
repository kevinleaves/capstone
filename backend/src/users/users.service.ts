import { Injectable, NotFoundException } from '@nestjs/common';
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

  getAll() {
    const users = this.repo.find();
    return users;
  }

  getOne(id: number) {
    const user = this.repo.findOne({ where: { id } });
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.getOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.getOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.repo.remove(user);
  }
}
