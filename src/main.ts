import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('HoopPost')
    .setDescription('The HoopPost API description')
    .setVersion('0.9')
    .addTag('post')
    .addTag('comment')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
