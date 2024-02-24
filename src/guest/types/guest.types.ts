import { Guest } from "../entities/guest.entity";

type TCreateGuestResponse = {
  guestCode : string,
  id : number
}
export type GuestResponse = {
  statusCode: number;
  data?: string | Guest[] | Guest | TCreateGuestResponse ;
  error?: string;
};
