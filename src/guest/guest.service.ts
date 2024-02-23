import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGuestDto } from './dtos/createGuest.dto';
import { generateCode } from 'src/uitls/helpers';
import { GuestOrderDto } from './dtos/guestOrder.dto';
import { GuestOrders } from './entities/guestOrders.entity';
@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest) private guestRepository: Repository<Guest>,
    private entityManager: EntityManager, @InjectRepository(GuestOrders) private guestOrdersRepository: Repository<GuestOrders>
  ) {}

  create(guestData: CreateGuestDto) {
    const guestCode = generateCode(guestData.fullName);
    guestData.guestCode = guestCode.toUpperCase();
    let newGuest = this.guestRepository.create(guestData);
    return this.guestRepository.save(newGuest);
  }

  findAll() {
    const data = this.entityManager.query(`
    select * from guests
    `)
    return data
  }

  findByCode(code : string) : Promise<Guest>{
    const data = this.entityManager.query(
      `
      select * from guests where guestCode = "${code}"
      `
    )
    return data
  }

  createOrder(guestOrder : GuestOrderDto[]){
    const data = this.guestOrdersRepository.createQueryBuilder()
      .insert()
      .into(Guest)
      .values(guestOrder)
      .execute();
    return data
  }
}
