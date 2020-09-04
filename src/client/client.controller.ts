import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientService } from './client.service';
import { FilterDTO } from 'src/DTO/filter.dto';
import { ClientRepository } from './client.repository';
import { Client } from './cliente.entity';
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
}
