import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatterInterceptor } from './formatter/formatter.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new FormatterInterceptor());
  const appName = 'Email API';
  const options = new DocumentBuilder()
    .setTitle(appName)
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, { customSiteTitle: appName });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
