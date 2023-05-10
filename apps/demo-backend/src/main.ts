import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Demo Application')
    .setDescription('Demo API for Dating App')
    .setVersion('1.0')
    .addTag('dating')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(environment.cors);

  app.setGlobalPrefix('api');
  swaggerConfig(app);

  app.enableShutdownHooks();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
