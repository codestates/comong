import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { setupSwagger } from 'src/util/swagger';

const httpsOptions = {
  key: fs.readFileSync('./secrets/comong.key.pem'),
  cert: fs.readFileSync('./secrets/comong.crt.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  setupSwagger(app);
  await app.listen(443);
}
bootstrap();
