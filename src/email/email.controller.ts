import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JsonFileDto } from './dto/json-file.dto';

@ApiTags("Email")
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('json')
    @ApiOperation({ summary: 'Parse email and extract JSON' })
    @ApiQuery({ name: 'emailPath', description: 'Path to the email file' })
    @ApiResponse({ status: 200, description: 'JSON extracted from email', schema: { example: { statusCode: 200, data: [JsonFileDto] } }, type: [JsonFileDto]})
    @ApiResponse({ status: 400, description: 'Error reading the email.', schema: { example: { statusCode: 400, message: 'Error reading the email.' } } })
    @ApiResponse({ status: 400, description: 'JSON parse error', schema: { example: { statusCode: 400, message: 'Failed to parse JSON content.' } } })
    @ApiResponse({ status: 404, description: 'Network error.', schema: { example: { statusCode: 404, message: 'Network error occurred while fetching JSON content.' } } })
    async parseEmail(@Query('emailPath') emailPath: string) {
        return this.emailService.parseEmail(emailPath);
    }
}
