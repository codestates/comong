import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'test username 01',
      password: 'test username 01 password',
    },
    {
      userId: 2,
      username: 'test username 02',
      password: 'test username 02 password',
    },
  ];

  async testFindOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(signInUserDto: SignInUserDto) {
    return `This action returns all users`;
  }

  findOne() {
    return `This action returns a #user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
