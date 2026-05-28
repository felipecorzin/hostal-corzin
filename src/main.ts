import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Gmail-Ms');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  
  app.setGlobalPrefix('/api/');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
    }),
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      'API para utilizar tienda en linea y administrar inventario',
    )
    .setVersion('1.0')
    // .setBasePath('/api/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Directorio Público
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
