import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { Logger } from '@nestjs/common';
const models = require('../../models/index');

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
  private readonly logger = new Logger(UsersService.name);

  async testFindOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  async create(createUserDto: CreateUserDto) {
    const user = models.user.findOrCreate({
      where: { email: createUserDto.email },
      default: createUserDto
    })
    return createUserDto;
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
