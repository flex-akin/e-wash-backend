import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  profile_picture: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone_number: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  password: string;
}
