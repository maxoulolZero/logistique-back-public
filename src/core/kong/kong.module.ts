import { HttpModule, Module } from '@nestjs/common';
import { KongService } from './kong.service';

@Module({
  imports: [HttpModule],
  providers: [KongService],
})
export class KongModule {}
