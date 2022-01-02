import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { StocksModule } from './api/stocks/stocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RDS_HOSTNAME: Joi.string().required(),
        RDS_PORT: Joi.number().required(),
        RDS_USERNAME: Joi.string().required(),
        RDS_PASSWORD: Joi.string().required(),
        RDS_DB_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    StocksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
