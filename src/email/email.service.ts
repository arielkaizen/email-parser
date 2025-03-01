import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ParsedMail, simpleParser } from 'mailparser';
import { JsonFileDto } from './dto/json-file.dto';
import { ORIGIN } from './enum/origin.enum';
import axios from 'axios';
import { ErrorCodes } from 'src/common/error-codes';

@Injectable()
export class EmailService {

    /**
     * Parses an email file and extracts JSON content from attachments and links.
     * @param emailPath - The path to the email file.
     * @returns A promise that resolves to an array of JsonFileDto objects.
     */
    async parseEmail(emailPath: string) {
        try {
            const email = fs.readFileSync(emailPath, 'utf8');
            const parsedEmail: ParsedMail = await simpleParser(email);

            const jsonAttatchments = await this.getJsonAttatchments(parsedEmail);
            const jsonsByLink = await this.getJsonByLinks(parsedEmail);

            return jsonAttatchments.concat(jsonsByLink || []);
        } catch (error) {
            throw { code: ErrorCodes.ERROR_READING_THE_EMAIL, message: error.message, status: 400 };
        }
        
    }

    /**
     * Extracts JSON content from email attachments.
     * @param parsedEmail - The parsed email object.
     * @returns A promise that resolves to an array of JsonFileDto objects.
     */
    async getJsonAttatchments(parsedEmail: ParsedMail): Promise<JsonFileDto[]> {
        try {
            const attachments = parsedEmail.attachments;
            return attachments.filter(attachment => attachment.contentType === 'application/json').map(attachment => {
                return {
                    fileName: attachment.filename,
                    origin: ORIGIN.ATTACHMENT,
                    json: JSON.parse(attachment.content.toString())
                };
            });
        } catch (error) {
            throw { code: ErrorCodes.JSON_PARSE_ERROR, message: error.message, status: 400 };
        }
    }

    /**
     * Extracts JSON content from links found in the email body.
     * @param parsedEmail - The parsed email object.
     * @returns A promise that resolves to an array of JsonFileDto objects or undefined.
     */
    private async getJsonByLinks(parsedEmail: ParsedMail): Promise<JsonFileDto[] | undefined> {
        try {
            const urls = this.getAnchorLinks(parsedEmail);
            return urls.length ? Promise.all(urls.map(async url => {
                const response = await axios.get(url);
                return {
                    fileName: url.split('/').pop(),
                    origin: ORIGIN.LINK,
                    json: response.data
                };
            })) : undefined;
        } catch (error) {
            throw { code: ErrorCodes.NETWORK_ERROR, message: error.message, status: 404 };
        }
    }

    /**
     * Extracts URLs from anchor links in the email body.
     * @param parsedEmail - The parsed email object.
     * @returns An array of URLs.
     */
    private getAnchorLinks(parsedEmail: ParsedMail): string[] {
        const regex = /<a\s+(?:[^>]*?\s+)?href="(https?:\/\/[^\s]+\.json)">\1<\/a>/g;
        const matches = parsedEmail.html.toString().matchAll(regex);
        return Array.from(matches, match => match[1]);
    }
    
}
