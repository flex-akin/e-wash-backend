import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Roles } from 'src/uitls/custom.decorator';
import { Role } from 'src/auth/dtos/role.enum';

@Roles(Role.Admin)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Get("/orders")
  async getOrders() {
    const data = await this.adminsService.findAllOrders();
    return {
      statusCode: HttpStatus.OK,
      data,
      message: "orders fetched successfully"
    }
  }

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
}
