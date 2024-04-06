import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService : MailerService
    ){}
    async sendCode(code : string, email : string, name : string){
        const subject = `Order Code Inside`;
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: 'order-code',
            context: {
              name,
              code
            },
          });
    }
3
    async forgotPassword(code : string, email : string){
        const subject = `Action Required! Temporary Password Inside`;
        
        await this.mailerService.sendMail({
            to: email,
            subject,
            template: 'change-password',
            context: {
              code 
            },
          });
    }
}