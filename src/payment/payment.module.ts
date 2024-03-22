import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Guest } from 'src/guest/entities/guest.entity';
import { GuestService } from 'src/guest/guest.service';
import { GuestOrders } from 'src/guest/entities/guestOrders.entity';
import { Plan } from 'src/users/entities/plan.entity';
import { UserOrders } from 'src/users/entities/userOrders.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User, UserOrders, Transaction, Guest, GuestOrders, Plan])],
  controllers: [PaymentController],
  providers: [PaymentService, UsersService, GuestService],
})
export class PaymentModule {}