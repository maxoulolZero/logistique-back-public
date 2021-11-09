import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { Init } from './init.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Init])],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
