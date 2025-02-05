import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const logger = new Logger(AppModule.name);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  app.enableVersioning();

  const config = new DocumentBuilder()
    .setTitle('Quiz Platform example')
    .setDescription('The quiz platform API description')
    .setVersion('1.0')
    .addTag('quiz')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const appPort: number = +process.env.APP_PORT

  await app.listen(appPort, () => {
    logger.log(`Server: http://localhost:${appPort}`);
    logger.log(`Docs:   http://localhost:${appPort}/api/docs`);
  });
}
bootstrap();
