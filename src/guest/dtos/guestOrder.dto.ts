import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class GuestOrderDto {
  @IsNotEmpty()
  clotheType: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  amount: number;
  orderCode : string
  user: User
}
