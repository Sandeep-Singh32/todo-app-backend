import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3005;
  // Enable CORS for all routes
  app.enableCors({ origin: '*' });
  await app.listen(PORT, () => {
    console.log('App is running on PORT: ' + PORT);
  });
}
bootstrap();
