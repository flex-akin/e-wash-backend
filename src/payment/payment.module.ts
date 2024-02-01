import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Guest } from 'src/guest/entities/guest.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User, Transaction, Guest])],
  controllers: [PaymentController],
  providers: [PaymentService, UsersService],
})
export class PaymentModule {}