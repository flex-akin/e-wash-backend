import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { GuestOrders } from './entities/guestOrders.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest, GuestOrders])],
  controllers: [GuestController],
  providers: [GuestService, EmailService],
})
export class GuestModule {}
