import { Injectable } from '@nestjs/common';
import * as mailer  from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly mailer: mailer.MailerService) {}

    async send(
        role: number,
        toArr: string[],
        subject: string,
        templateName: string,
        context: any = {},
    ): Promise<boolean>{
        if(role === 1){
            await this.mailer.sendMail({
                to: toArr.join(', '),
                subject,
                template: `${templateName}`,
                context,
            });
            return true;
        } else {
            return true;
        }
    }
}
