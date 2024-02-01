import { UserResponseDto } from 'src/users/dtos/responseUser.dto';

export type authResponse = {
  auth_token: string;
  statusCode: number;
  data?: UserResponseDto;
  error?: string;
};
