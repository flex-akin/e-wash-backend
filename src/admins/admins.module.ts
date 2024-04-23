import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from 'src/guest/entities/guest.entity';
import { UserOrders } from 'src/users/entities/userOrders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest, UserOrders])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
