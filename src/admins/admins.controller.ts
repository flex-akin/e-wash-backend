import { Controller, Get, HttpStatus, Param, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Public, Roles } from 'src/uitls/custom.decorator';
import { Role } from 'src/auth/dtos/role.enum';


@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }
  @Roles(Role.Admin)
  @Get("/orders")
  async getOrders() {
    const data = await this.adminsService.findAllOrders();
    return {
      statusCode: HttpStatus.OK,
      data,
      message: "orders fetched successfully"
    }
  }

  @Roles(Role.Admin)
  @Get("/orders/:code/:type")
  async getOrdersByCode(
    @Param('code') code: string,
    @Param('type') type: string
  ) {
    const data = await this.adminsService.findSingleOrder(
      code, type
    );

    return {
      statusCode: HttpStatus.OK,
      data,
      message: "order fetched successfully"
    }
  }

  @Roles(Role.Admin)
  @Get("/orders/completed/:code/:type")
  async completed(
    @Param('code') code: string,
    @Param('type') type: string
  ){
   await this.adminsService.completed(code, type)
   return {
    statusCode: HttpStatus.OK,
    data : true,
    message: "order has be set to completed"
  }
  }
  
  @Get("/payments")
  async getPayments(
    @Request() request
  ){
    const payments = await this.adminsService.getPayments(request.user.role, request.user.id)
    return {
      statusCode: HttpStatus.OK,
      data : payments,
      message : "data fetched successfully"
    }
  }
}
