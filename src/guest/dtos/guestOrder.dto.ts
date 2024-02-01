import { IsNotEmpty } from 'class-validator';

export class GuestOrderDto {
  @IsNotEmpty()
  clotheType: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  amount: number;

}
