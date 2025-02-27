import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('json')
    async parseEmail(@Query('emailPath') emailPath: string) {
        return this.emailService.parseEmail(emailPath);
    }
}
