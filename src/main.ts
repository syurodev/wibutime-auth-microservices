import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LogLevel } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
      logger: process.env.CONFIG_LOGGER_LEVEL.split(',').filter(
        (level: string): level is LogLevel => {
          return ['log', 'error', 'warn', 'debug', 'verbose'].includes(
            level as LogLevel,
          );
        },
      ),
    },
  );

  moment.tz.setDefault('Asia/Ho_Chi_Minh');

  app.listen();
}
bootstrap();
