import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { authResponse } from './types/authResponse.type';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dtos/responseUser.dto';
import { Public } from 'src/uitls/custom.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() loginDto: LoginDto): Promise<authResponse> {
    const user = await this.authService.signIn(
      loginDto.email,
      loginDto.password,
    );
    const payload: UserResponseDto = {
      id : user.id,
      username: user.username,
      email: user.email,
      address: user.address,
      first_name: user.first_name,
      profile_picture: user.profile_picture,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role : user.role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      statusCode: HttpStatus.OK,
      auth_token: access_token,
      data: user,
    };
  }
}
