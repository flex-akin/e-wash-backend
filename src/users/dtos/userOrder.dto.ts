import { IsNotEmpty } from "class-validator";
import { GuestOrderDto } from "src/guest/dtos/guestOrder.dto";

export class UserOrderDto {
    @IsNotEmpty()
    userOrder : GuestOrderDto[]
}