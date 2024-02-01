import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGuestDto } from './dtos/createGuest.dto';
import { generateCode } from 'src/uitls/helpers';
@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest) private guestRepository: Repository<Guest>,
    private entityManager: EntityManager,
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
}
