import { BadRequestException, Injectable, BadGatewayException, InternalServerErrorException } from '@nestjs/common';
import * as mailer  from '@nestjs-modules/mailer';
const models = require('../../models/index');
import { v4 } from 'uuid';

@Injectable()
export class MailerService {
    constructor(private readonly mailer: mailer.MailerService) {}

    async signUp(
        user: {id, role},
        toArr: string[],
        subject: string,
        templateName: string,
        context: any = {},
    ): Promise<object>{
        if(user.role === 1){
            const identificationCode = v4()
            models.refreshtoken.create({
                refreshtoken: identificationCode,
                exp: new Date(),
                user_id: user.id
            }, {
                include: [{model: models.user, as: 'user'}]
            }).then(async result => {
                const confirmationUrl = `https://api.comong.kr/users/verifications/${result.dataValues.refreshtoken}`
                Object.assign(context, {confirmationUrl: confirmationUrl})
                const newMail = await this.mailer.sendMail({
                    to: toArr.join(', '),
                    subject,
                    template: `${templateName}`,
                    context,
                });
                console.log(newMail)
                if(newMail && newMail.response.split(' ')[2] === 'OK'){
                    return new Object({ message: 'an confirmation letter has been sent' })
                } else {
                    return new InternalServerErrorException('service unavailable(mailer)')
                }
            })

            
        } else {
            return new Object({ message: 'successfulmailer' })
        }
    }

    async sendOrderNotice(
        newOrder: object,
        context: any = {},
        emailAddress: string,
        subject: string,
        templateName: string,
    ): Promise<object>{
        const newMail = await this.mailer.sendMail({
            to: emailAddress,
            subject,
            template: `${templateName}`,
            context,
        });
        console.log(newMail)
        if(newMail && newMail.response.split(' ')[2] === 'OK'){
            return new Object({ data: newOrder, message:'order_notice letter has been sent successfully' })
        } else {
            return new InternalServerErrorException('service unavailable(mailer)')
        }
    }

    async sendPaymentNotice(
        newPayment: object,
        context: any = {},
        emailAddress: string,
        subject: string,
        templateName: string,
    ): Promise<object>{
        const newMail = await this.mailer.sendMail({
            to: emailAddress,
            subject,
            template: `${templateName}`,
            context,
        });
        console.log(newMail)
        if(newMail && newMail.response.split(' ')[2] === 'OK'){
            return new Object({ 
                data: newPayment, 
                message:'payment_notice letter has been sent successfully' 
            })
        } else {
            return new InternalServerErrorException('service unavailable(mailer)')
        }
            
        
    }
}
