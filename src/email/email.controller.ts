import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JsonFileDto } from './dto/json-file.dto';

@ApiTags("Email")
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get('json')
    @ApiOperation({ summary: 'Parse email and extract JSON' })
    @ApiParam({ name: 'emailPath', description: 'Path to the email file' })
    @ApiResponse({ status: 200, description: 'JSON extracted from email', type: [JsonFileDto] })
    async parseEmail(@Query('emailPath') emailPath: string) {
        return this.emailService.parseEmail(emailPath);
    }
}
