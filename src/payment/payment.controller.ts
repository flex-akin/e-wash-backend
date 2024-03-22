import { Body, Controller, Headers, HttpCode, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public, Roles } from 'src/uitls/custom.decorator';
import { Role } from 'src/auth/dtos/role.enum';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('webhook')
  @Public()
  @HttpCode(200)
  async webhook(
    @Body() data : any, @Headers() headers : any
  ){
    let res = await this.paymentService.webhook(data, headers['x-paystack-signature'])
    if (res === true){
      return HttpStatus.OK
    }
    else {
      throw new InternalServerErrorException();
    }
   
  } 

  @Post()
  @Public()
  initializeTransaction(
    @Body() data : {amount : number, id : number}) {
      const paystackUserDto = {
        amount : data.amount,
        id : data.id,
      }
    const paystack = this.paymentService.initializeTransaction(paystackUserDto)
    
    return paystack
  }

  @Post('/subscribe/:plan')
  @Roles(Role.User)
  initializeSubscription(
    @Request() request,
    @Param('plan') plan : string,
  ){
    const user = request.user
    const amount = plan == "basic" ? 25500 : 35500
    const paystackUserDetails = {
      email : user.email,
      id : user.id,
      amount
    }
   const paystack =  this.paymentService.subscribe(paystackUserDetails)
   return paystack
  }
}
