import { IsNotEmpty } from 'class-validator';
import { GuestOrderDto } from './guestOrder.dto';

export class CreateGuestDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  streetAddress: string;
  instructions?: string;
  guestCode: string;
  @IsNotEmpty()
  guestOrders : GuestOrderDto[]
  
}
