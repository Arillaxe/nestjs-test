import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OracleModule } from './oracle/oracle.module';
import { CoinsModule } from './coins/coins.module';
import { appConfig } from './config/app.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: Joi.object({
        UPDATE_INTERVAL: Joi.number().min(1000).required(),
        SERVICE_COMMISSION: Joi.number().min(0).required(),
        FETCH_TIMEOUT: Joi.number(),
        PORT: Joi.number(),
      }),
    }),
    OracleModule,
    CoinsModule,
  ],
})
export class AppModule {}
