import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { GuestModule } from './guest/guest.module';
import { EmailModule } from './email/email.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PaymentModule,
    GuestModule,
    EmailModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
