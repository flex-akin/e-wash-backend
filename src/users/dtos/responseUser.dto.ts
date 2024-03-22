import { CreateUserBody } from '../types/user.types';

export class UserResponseDto {
  id: number;
  profile_picture: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  role : string;


  constructor(userData: CreateUserBody) {
    this.profile_picture = userData.profile_picture;
    this.address = userData.address;
    this.email = userData.email;
    this.phone_number = userData.phone_number;
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
    this.username = userData.username;
    this.role = userData.role
    this.id = userData.id
  }
}
