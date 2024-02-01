import { Guest } from "../entities/guest.entity";

export type GuestResponse = {
  statusCode: number;
  data?: string | Guest[] | Guest;
  error?: string;
};
