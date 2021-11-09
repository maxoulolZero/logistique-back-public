import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Init } from './init.entity';
import { InitService } from './init.service';

@Controller('logistique')
export class InitController {
  constructor(public initService: InitService) {}

  @Get('')
  getAllInitData() {
    return this.initService.getAll();
  }

  @Get(':metier')
  getMetierData(@Param('metier') metier: string, @Res() response: Response) {
    return this.initService
      .getFromKong(metier)
      .then(result => response.send(result.data))
      .catch(err => {
        response.status(HttpStatus.NOT_FOUND).send(err);
      });
  }

  @Post('')
  createInitData(@Body() data: Init) {
    return this.initService.create(data);
  }

  @Put(':id')
  updateInitData(@Param('id') i, @Body() data: Init) {
    const id = Number(i);
    console.log('UPDATE #' + id);
    return this.initService.update(id, data);
  }

  @Delete(':id')
  deleteInitData(@Param('id') i) {
    const id = Number(i);
    console.log('Delete #' + id);
    return this.initService.delete(id);
  }
}
