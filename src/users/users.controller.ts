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
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { TChangePWDto, TFeedbackDto, UserResponse } from './types/user.types';
import { UserResponseDto } from './dtos/responseUser.dto';
import { Public, Roles } from 'src/uitls/custom.decorator';
import { Role } from 'src/auth/dtos/role.enum';
import { GuestOrderDto } from 'src/guest/dtos/guestOrder.dto';
import { HttpStatusCode } from 'axios';
import { UserOrderDto } from './dtos/userOrder.dto';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Roles(Role.User)
  @Get("/order")
  async getOrders(
    @Request() request,
  ) {
    const value = await this.usersService.getAllOrders(request.user.id)
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "Data fetched successfully"
    }
  }
  @Roles(Role.User)
  @Get("/plan")
  async getPlan(
    @Request() request,
  ) {
    const value = await this.usersService.getPlan(request.user.id)
    if (!value.isSubscribed){
      return {
        statusCode: HttpStatus.OK,
        data: {
          isSubscribed : false,
          remnant : "N/A",
          type : "N/A"
        },
        message: "Data fetched successfully"
      }
    }
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "Data fetched successfully"
    }
  }

  @Roles(Role.User)
  @Put('/selectPlan/:plan')
  async selectPlan(
    @Param('plan') plan: string,
    @Request() request,
  ) {
    this.usersService.selectPlan(plan, request.user.id)
    return {
      statusCode: HttpStatus.OK,
      data: true,
      message: "you have selected your plan"
    }
  }

  @Roles(Role.User)
  @Get("/checkUserOrder")
  async checkUserOrderStatus(
    @Query() queryParams: { orderCode: string },
  ) {
    const value = await this.usersService.checkUserOrderStatus(queryParams.orderCode)
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "successful"
    }
  }


  @Roles(Role.Admin)
  @Get("/feedback")
  async getFeedback(
  ){
    const feedbacks = await this.usersService.getFeedback()
    return {
      statusCode: HttpStatus.OK,
      data: feedbacks,
      message: "your feedback have been sent successfully"
    }
  }

  @Get()
  async findAllUsers(): Promise<UserResponse> {
    const user = await this.usersService.findUsers();
    return {
      statusCode: HttpStatus.OK,
      message: "user fetched",
      data: user,
    };
  }

  @Roles(Role.User)
  @Get('/getOrderByCOde')
  async getOrderByCOde(
    @Request() request
  ) {
    const value = await this.usersService.getAllOrdersByCode(request.user.id)
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "order fetched successfully"
    }
  }

  @Public()
  @Get('/:id')
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

  @Public()
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
          'email is already taken',
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

  @Roles(Role.User)
  @Post("/createOrder")
  async createUserOrder(
    @Request() request,
    @Body() userOder: UserOrderDto
  ) {
    const value = await this.usersService.createUserOrder(userOder.userOrder, request.user.id)
    return {
      statusCode: HttpStatus.CREATED,
      data: value,
      message: "Your order has been completed successfully"
    }
  }

  @Roles(Role.User)
  @Post("/schedule")
  async schedule(
    @Query() queryParams: { date: string, orderCode: string },
  ) {
    const value = await this.usersService.scheduleDate(queryParams.date, queryParams.orderCode)
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "date scheduled"
    }
  }

  @Public()
  @Post("/forgotPassword")
  async forgotPassword(
    @Query() queryParams: { email: string }
  ) {
    const value = await this.usersService.forgotPassword(queryParams.email);
    return {
      statusCode: HttpStatus.OK,
      data: value,
      message: "password reset email sent"
    }
  }

  @Roles(Role.User)
  @Post("/changePassword")
  async changePassword(
    @Request() request,
    @Body() changePasswordDto: TChangePWDto
  ) {
    this.usersService.changePassword(request.user.id, changePasswordDto.newPassword, changePasswordDto.oldPassword)
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: "password changed successfully"
    }
  }

  @Roles(Role.User)
  @Post("/feedback")
  async createFeedback(
    @Body() feedbackDto: TFeedbackDto
  ) {
    this.usersService.createFeedback(feedbackDto)
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: "your feedback have been sent successfully"
    }
  }


}
