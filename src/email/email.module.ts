import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports:[
    MailerModule.forRootAsync({
      useFactory: (configService : ConfigService)=> ({
        transport: {
          host : configService.getOrThrow('MAIL_HOST'),
          port : configService.getOrThrow('MAIL_PORT'),
          secure : false,
          auth : {
            user : configService.getOrThrow('MAIL_AUTH_USER'),
            pass : configService.getOrThrow('MAIL_AUTH_PASSWORD')
          }
        },
        defaults: {
          from: '"E-Wash" ewashlaund@gmail.com',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
