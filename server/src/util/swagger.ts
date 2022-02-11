import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Comong API Docs')
    .setDescription('코몽(Comong) 서비스의 Api 문서입니다.')
    .setVersion('1.0.0')
    .build();


  const customOptions: SwaggerCustomOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Comong Api Docs',
  }
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOptions);
}