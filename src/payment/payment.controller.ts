import { Body, Controller, Headers, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from 'src/uitls/custom.decorator';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('webhook')
  @Public()
  webhook(
    @Body() data : any, @Headers() headers : any
  ){
    this.paymentService.webhook(data, headers['x-paystack-signature'])
    return headers
  } 

  @Post(':id')
  @Public()
  initializeTransaction(
    @Body() data : {amount : number}, @Param('id', ParseIntPipe) id : number) : any{
      const paystackUserDto = {
        amount : data.amount,
        id
      }

    const paystack = this.paymentService.initializeTransaction(paystackUserDto)
    
    return paystack
  }


}
