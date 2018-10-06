import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async showAll(): Promise<any> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }
  async read(username): Promise<any> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async register(data: UserDTO) {
    const { email } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);
    return newUser.toResponseObject();
  }

  async login(@Body() data: UserDTO) {
    const { password, email } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (!(await user.comparePassword(password))) {
      throw new HttpException('Invalide login', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject(true);
  }
}
