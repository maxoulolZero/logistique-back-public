import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {

  constructor(@InjectRepository(Stock) private readonly stockRepository: Repository<Stock>) {}

  create(createStockDto: CreateStockDto) {
    const stock = this.stockRepository.create(createStockDto);
    return this.stockRepository.save(stock);
  }

  findAll() {
    return this.stockRepository.find();
  }

  findOne(id: number) {
    return this.stockRepository.findOne(id);
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return this.stockRepository.update(id, updateStockDto);
  }

  remove(id: number) {
    return this.stockRepository.delete(id);
  }
}
