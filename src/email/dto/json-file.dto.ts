import { ORIGIN } from "../enum/origin.enum";

export class JsonFileDto {
    fileName: string | undefined;
    origin: ORIGIN;
    json: any;
};