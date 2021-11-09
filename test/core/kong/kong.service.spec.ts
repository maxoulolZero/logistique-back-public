import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { KongService } from '../../../src/core/kong/kong.service';

describe('KongService', () => {
  let service: KongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [KongService],
    }).compile();

    service = module.get<KongService>(KongService);
  });

  it('should be defined', () => {
    expect(service).toEqual(service);
  });
});
