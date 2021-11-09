import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { triggerAsyncId } from 'async_hooks';
import axios from 'axios';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StockService {
    constructor(@InjectRepository(Stock) private stockRepository: Repository<Stock>){}

    async getAll(): Promise<Stock[]>{
        return await this.stockRepository.find();
    }

    async getByCodeProduit(code_produit): Promise<Stock>{
        let produit = await this.stockRepository.findOne({
            where: {
                code_produit,
            }
        }).catch(err =>{
            throw new HttpException('Code produit inconu', HttpStatus.NOT_FOUND);
        })
        return produit;
    }

    async addProduit(data): Promise<Stock> {
        let res : Stock =  { ... data } ;
        console.log(res);
        return await this.stockRepository.save(res);
    }

    async update(data): Promise<Stock> {
        const code_produit = data.code_produit;
        const stock = await this.getByCodeProduit(code_produit); // find product
        if (stock) { // update if exists
            stock.stock_disponible += data.quantity;
            const updateStock = this.stockRepository.update(stock.id, stock);
            return this.stockRepository.findOne(stock);
        }
        throw new HttpException('Code produit inconu', HttpStatus.NOT_FOUND);
    }
}

