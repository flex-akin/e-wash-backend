import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dtos/responseUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Incorrect Password');
    const userResponse = new UserResponseDto(user);
    return userResponse;
  }
}
