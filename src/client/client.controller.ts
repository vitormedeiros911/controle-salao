import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientService } from './client.service';
import { FilterDTO } from 'src/DTO/filter.dto';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';
import { CreateClientDTO } from './DTO/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(
    private clientService: ClientService,
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  @Post('new')
  createClient(@Body() createClientDTO: CreateClientDTO): Promise<Client> {
    return this.clientService.createClient(createClientDTO);
  }

  @Get()
  async getAllClients(@Query() filter: FilterDTO): Promise<Client[]> {
    if (filter.search) {
      return await this.clientRepository.find({
        where: {
          name: filter.search,
        },
      });
    }
    return await this.clientRepository.find();
  }

  @Get(':id')
  getOneClient(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientService.getOneClient(id);
  }

  @Patch('edit/:id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() createClientDTO: CreateClientDTO,
  ): Promise<Client> {
    return this.clientService.updateClient(id, createClientDTO);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientService.deleteClient(id);
  }
}
