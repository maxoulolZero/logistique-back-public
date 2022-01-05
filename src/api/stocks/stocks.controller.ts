import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ParseIntPipe } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('')
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('Fetching one stock with ID : ' + id);
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
    this.logger.log(`Updating stock : ${id} with new fields : ${JSON.stringify(updateStockDto)}`);
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('Removing stock : ' + id);
    return this.stocksService.remove(+id);
  }
}
