import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ParsedMail, simpleParser } from 'mailparser';
import { JsonFileDto } from './dto/json-file.dto';
import { ORIGIN } from './enum/origin.enum';

@Injectable()
export class EmailService {

    async parseEmail(emailPath: string) {
        const email = fs.readFileSync(emailPath, 'utf8');
        const parsedEmail: ParsedMail = await simpleParser(email);
        return this.getJsonAttatchments(parsedEmail);
    }

    async getJsonAttatchments(parsedEmail: ParsedMail): Promise<JsonFileDto[]> {
        const attachments = parsedEmail.attachments;
        return attachments.filter(attachment => attachment.contentType === 'application/json').map(attachment => {
            return {
                fileName: attachment.filename,
                from: ORIGIN.ATTACHMENT,
                json: JSON.parse(attachment.content.toString())
            };
        });
    }
    
}
