import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { WelcomeMailDto } from "../interfaces";

@Injectable()
export class EmailService {
    constructor(private readonly mailService: MailerService) {}

    async sendWelcomeMail(dto: WelcomeMailDto): Promise<boolean> {
        try {
            await this.mailService.sendMail({
                to: dto.email,
                subject: "Subject: Welcome to TTK",
                template: "account-welcome",
                context: {
                    ...dto,
                },
            });
            return true;
        } catch {
            throw new InternalServerErrorException();
        }
    }
}
