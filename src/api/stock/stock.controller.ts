import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';

@Controller('stock')
export class StockController {
    constructor(public stockService: StockService){}

    @Get('')
    getAllStock() {
        return this.stockService.getAll();
    }

    @Get(':id')
    getStockByCodeProduit(@Param('id') codeProduit) {
        return this.stockService.getByCodeProduit(codeProduit);
    }

    @Post('')
    addProduit(@Body() data: Stock) {
        return this.stockService.addProduit(data);
    }

    @Post('commande')
    updateProduit(@Body() data: Stock) {
        return this.stockService.update(data);
    }
}