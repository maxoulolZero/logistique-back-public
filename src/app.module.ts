import { Module } from '@nestjs/common';
import { KongModule } from './core/kong/kong.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { InitModule } from './api/init/init.module';
import { StockModule } from './api/stock/stock.module';

@Module({
  imports: [
    KongModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PGHOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    InitModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
