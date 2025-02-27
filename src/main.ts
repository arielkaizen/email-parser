import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatterInterceptor } from './formatter/formatter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new FormatterInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
