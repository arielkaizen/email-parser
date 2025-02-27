import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ParsedMail, simpleParser } from 'mailparser';
import { JsonFileDto } from './dto/json-file.dto';
import { ORIGIN } from './enum/origin.enum';
import axios from 'axios';

@Injectable()
export class EmailService {

    async parseEmail(emailPath: string) {
        const email = fs.readFileSync(emailPath, 'utf8');
        const parsedEmail: ParsedMail = await simpleParser(email);

        const jsonAttatchments = await this.getJsonAttatchments(parsedEmail);
        const jsonsByLink = await this.getJsonByLinks(parsedEmail);

        return jsonAttatchments.concat(jsonsByLink || []);
    }

    async getJsonAttatchments(parsedEmail: ParsedMail): Promise<JsonFileDto[]> {
        const attachments = parsedEmail.attachments;
        return attachments.filter(attachment => attachment.contentType === 'application/json').map(attachment => {
            return {
                fileName: attachment.filename,
                origin: ORIGIN.ATTACHMENT,
                json: JSON.parse(attachment.content.toString())
            };
        });
    }

    private async getJsonByLinks(parsedEmail: ParsedMail): Promise<JsonFileDto[] | undefined> {
        const urls = this.getAnchorLinks(parsedEmail);
        return urls.length ? Promise.all(urls.map(async url => {
            const response = await axios.get(url);
            return {
                fileName: url.split('/').pop(),
                origin: ORIGIN.LINK,
                json: response.data
            };
        })) : undefined;
    }

    private getAnchorLinks(parsedEmail: ParsedMail): string[] {
        const regex = /<a\s+(?:[^>]*?\s+)?href="(https?:\/\/[^\s]+\.json)">\1<\/a>/g;
        const matches = parsedEmail.html.toString().matchAll(regex);
        return Array.from(matches, match => match[1]);
    }
    
}
