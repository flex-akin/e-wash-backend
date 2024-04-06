import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserOrders } from './entities/userOrders.entity';
import { Plan } from './entities/plan.entity';
import { EmailService } from 'src/email/email.service';
import { Feedback } from './entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserOrders, Plan, Feedback])],
  providers: [UsersService, JwtService, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}
