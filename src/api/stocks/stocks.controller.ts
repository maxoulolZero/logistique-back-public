import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {

  private readonly logger = new Logger(StocksController.name);

  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    this.logger.log('New stock : ' + JSON.stringify(createStockDto));
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all stocks');
    return this.stocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('Fetching one stock with ID : ' + id);
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    this.logger.log(`Updating stock : ${id} with new fields : ${JSON.stringify(updateStockDto)}`);
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('Removing stock : ' + id);
    return this.stocksService.remove(+id);
  }
}
