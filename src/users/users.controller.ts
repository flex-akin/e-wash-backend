import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Request,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponse } from './types/user.types';
import { UserResponseDto } from './dtos/responseUser.dto';
import { Public, Roles } from 'src/uitls/custom.decorator';
import { Role } from 'src/auth/dtos/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<UserResponse> {
    const user = await this.usersService.findUsers();
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Public()
  @Get(':id')
  async findOneUser(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const user = await this.usersService.findOneUser(id);
    if (!user) throw new HttpException('No User Found', HttpStatus.NOT_FOUND);
    const userResponse = new UserResponseDto(user);
    return {
      statusCode: HttpStatus.OK,
      data: userResponse,
    };
  }

  @Roles(Role.Admin)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    try {
      let user = await this.usersService.createUser(createUserDto);
      const userResponse = new UserResponseDto(user);
      return {
        statusCode: HttpStatus.CREATED,
        data: userResponse,
      };
    } catch (error) {
      if (error.message.includes('UQ_USERNAME'))
        throw new HttpException(
          'Username is already taken',
          HttpStatus.BAD_REQUEST,
        );
      else if (error.message.includes('UQ_EMAIL'))
        throw new HttpException(
          'You already have an account with us',
          HttpStatus.BAD_REQUEST,
        );
      else throw new InternalServerErrorException(error.message);
    }
  }
}
