import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from 'src/guest/entities/guest.entity';
import { UserOrders } from 'src/users/entities/userOrders.entity';
import { TSingleOrder, TUserOrderDetails } from 'src/users/types/user.types';
import { EntityManager, Repository } from 'typeorm';


@Injectable()
export class AdminsService {
    constructor(
        private entityManager: EntityManager,
        @InjectRepository(UserOrders) private userOrdersRepository : Repository<UserOrders>,
        @InjectRepository(Guest) private guestRepository : Repository<Guest>,
    ) { }
    async findAllOrders() {
        const value = await this.entityManager.query(`   
            select distinct orderCode as code, isCompleted, 'user' as type, created_at from user_orders
        union all
            select guestCode as code, isCompleted, 'guest' as type, created_at from guests
        order by created_at;
        `)
        return value;
    }

    async findSingleOrder(code: string, type: string) {
        let value: TSingleOrder
        let userOrderDetails: TUserOrderDetails
        if (type === "guest") {
           
            value = await this.entityManager.query(`
            select a.clotheType, a.quantity, a.amount 
            from guest_orders a, guests b 
            where a.guestId = b.id and b.guestCode = "${code}";
        `)
            userOrderDetails = await this.entityManager.query(`
        select a.guestCode as code, a.isCompleted,
        a.isDelivered, a.created_at as date, a.email, 
        a.streetAddress as address, a.phoneNumber
        from guests a where a.guestCode = "${code}";
    `)
        }
        else if (type === "user") {
            value = await this.entityManager.query(`
            select a.clotheType, a.quantity, a.amount 
            from user_orders a where a.orderCode = "${code}";
        `)
            userOrderDetails = await this.entityManager.query(`
        select a.orderCode as code, a.isCompleted,
        a.isDelivered, a.created_at as date, b.email, 
        b.address, b.phone_number as phoneNumber
        from user_orders a, users b where a.orderCode = "${code}"
        and a.user_id = b.id;
    `)
        }
        return {
            userOrderDetails :userOrderDetails[0] ,
            orderContent : value
        }
    }

    async completed(code: string, type: string){

        if (type === "guest"){
            let data = await this.guestRepository.findOneBy({
                guestCode : code
            })
            this.guestRepository.update({guestCode : code }, {isCompleted : !data.isCompleted})
        }
        else if (type === "user"){
            let data = await this.userOrdersRepository.findOneBy({
                orderCode : code
            })
            this.userOrdersRepository.update({orderCode : code}, {isCompleted : !data.isCompleted})
        }
        return true
    }
   
}
