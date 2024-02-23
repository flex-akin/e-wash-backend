import { Body, Controller, Headers, HttpCode, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from 'src/uitls/custom.decorator';


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
