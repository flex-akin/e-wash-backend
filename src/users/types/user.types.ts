import { UserResponseDto } from '../dtos/responseUser.dto';
import { User } from '../entities/user.entity';

export type CreateUserBody = {
  profile_picture: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
};

export type UserResponse = {
  statusCode: number;
  data?: UserResponseDto | User[];
  error?: string;
};

export type PaystackUserDto = {
  email? : string;
  id : number;
  amount : number;
}
