import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientRepository } from './client.repository';
import { CreateClientDTO } from './DTO/create-client.dto';
import { Client } from './cliente.entity';
import { ClientExistentException } from './clientExistent.exception';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async createClient(createClientDTO: CreateClientDTO): Promise<Client> {
    const { name } = createClientDTO;

    const existentProcedure: Client = await this.clientRepository.findOne({
      where: { name },
    });

    if (existentProcedure) {
      throw new ClientExistentException();
    } else {
      const procedure = this.clientRepository.create(createClientDTO);
      return await this.clientRepository.save(procedure);
    }
  }
}
