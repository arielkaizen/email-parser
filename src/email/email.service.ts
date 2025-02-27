import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ParsedMail, simpleParser } from 'mailparser';

@Injectable()
export class EmailService {

    async parseEmail(emailPath: string) {
        const email = fs.readFileSync(emailPath, 'utf8');
        const parsedEmail:ParsedMail = await simpleParser(email);
        return this.getJsonAttatchments(parsedEmail);
    }

    async getJsonAttatchments(parsedEmail: ParsedMail) {
        const attachments = parsedEmail.attachments;
        return attachments.map(attachment => {
            if (attachment.contentType === 'application/json') {
                return JSON.parse(attachment.content.toString());
            }
        });
    }
    
}
