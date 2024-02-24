import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGuestDto } from './dtos/createGuest.dto';
import { generateCode } from 'src/uitls/helpers';
import { GuestOrders } from './entities/guestOrders.entity';
@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest) private guestRepository: Repository<Guest>,
    private entityManager: EntityManager, @InjectRepository(GuestOrders) private guestOrdersRepository: Repository<GuestOrders>
  ) {}

  async create(guestData: CreateGuestDto) {
    const guestCode = generateCode(guestData.fullName);
    guestData.guestCode = guestCode.toUpperCase();
    let newGuest = this.guestRepository.create(guestData);
    let guestGuestOrders : GuestOrders[] = [];
    for (let i = 0; i < guestData.guestOrders.length; i++ ){
      let guest = this.guestOrdersRepository.create(guestData.guestOrders[i])
      await this.guestOrdersRepository.save(guest)
      guestGuestOrders.push(guest)
    }

    newGuest.guestOrders = guestGuestOrders
    const {id} = await this.guestRepository.save(newGuest);
    return {
      status : true,
      guestCode,
      id      
    }
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

  findById(id : number) : Promise<Guest>{
    const data = this.entityManager.query(
      `
      select * from guests where id = ${id}
      `
    )
    return data
  }
}
