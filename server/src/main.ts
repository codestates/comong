require('dotenv').config();

import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';

async function bootstrap() {
  const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type'],
    credentials: true,
  };
  const validationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  };
  if (
    fs.existsSync('./secrets/key.pem') &&
    fs.existsSync('./secrets/cert.pem')
  ) {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/key.pem', 'utf8'),
      cert: fs.readFileSync('./secrets/cert.pem', 'utf8'),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    app.enableCors(corsOptions);
    setupSwagger(app);
    await app.listen(443);
    console.log(`https server runnning on port 443`);
  } else {
    const app = await NestFactory.create(AppModule, {});
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    app.enableCors(corsOptions);
    setupSwagger(app);
    await app.listen(80);
    console.log(`http server runnning on port 80`);
  }
}
bootstrap();
