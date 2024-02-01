import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserBody } from './types/user.types';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  findUsers() {
    return this.userRepository.find({
      select: ['profile_picture', 'username', 'address', 'email'],
    });
  }

  findOneUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findUserByUsername(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(userDetails: CreateUserBody) {
    let unhashedPassword = userDetails.password;
    const hashString = this.configService.getOrThrow('HASH');
    const password = await bcrypt.hash(unhashedPassword, hashString);
    userDetails = { ...userDetails, password };
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }
}
