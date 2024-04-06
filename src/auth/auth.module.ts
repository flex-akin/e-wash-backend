import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';
import { Plan } from 'src/users/entities/plan.entity';
import { UserOrders } from 'src/users/entities/userOrders.entity';
import { EmailService } from 'src/email/email.service';
import { Feedback } from 'src/users/entities/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Plan, UserOrders, Feedback]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  
  ],
})
export class AuthModule {}
