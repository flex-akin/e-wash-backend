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
  role : string;
  id : number
};

export type UserResponse = {
  statusCode: number;
  data?: UserResponseDto | User[];
  error?: string;
  message?: string
};

export type PaystackUserDto = {
  email? : string;
  id : number;
  amount : number;
}

export type TChangePWDto = {
  newPassword : string
  oldPassword : string
}

export type TFeedbackDto = {
  subject :string;
  message : string
}

export type TSingleOrder = {
  clotheType : string
  quantity : number
  amount : number
}

export type TUserOrderDetails = {
  code : string
  isCompleted : boolean
  isDelivered : boolean
  date : string
  email : string
  address : string
  phoneNumber : string
}