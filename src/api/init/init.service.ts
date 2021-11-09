import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Init } from './init.entity';

@Injectable()
export class InitService {
  constructor(@InjectRepository(Init) private initRepository: Repository<Init>) {}

  async getAll(): Promise<Init[]> {
    return await this.initRepository.find();
  }

  async getFromKong(metier: string) {
    const options = {
      'back-office': '/backoffice/',
      logistique: '/logistique/',
      achat: '/achat/base-info',
      bi: '/businessintelligence/',
      promos: '/promo/',
      caisse: '/caisse/receipt/',
      'e-commerce': '/e-commerce/order',
      fidélité: '/fidelite/client',
      paiement: '/paiement/',
      référentiel: '/referentiel/product/',
      sav: '/logistique/',
    };

    //return await axios.get(process.env.URI + options[metier]);
    return await axios.get(process.env.URI + '/' + options[metier]);
  }

  async create(data): Promise<Init> {
    data.date_of_creation = Date.now().toString();
    data.date_of_edition = Date.now().toString();
    return await this.initRepository.save(data);
  }

  update(id, data): Promise<UpdateResult> {
    data.date_of_edition = Date.now().toString();
    const updateInit = this.initRepository.update(id, data);
    const response = this.initRepository.findOne(data);
    if (response) {
      return updateInit;
    }
    throw new HttpException("Data not found or can't be updated", HttpStatus.NOT_FOUND);
  }

  async delete(id): Promise<DeleteResult> {
    const deleteInit = await this.initRepository.delete(id);
    if (!deleteInit.affected) {
      throw new HttpException("Data not found. Can't be deleted", HttpStatus.NOT_FOUND);
    }
    return deleteInit;
  }
}
