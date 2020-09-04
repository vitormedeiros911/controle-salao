import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientRepository } from './client.repository';
import { CreateClientDTO } from './DTO/create-client.dto';
import { Client } from './client.entity';
import { ClientExistentException } from './clientExistent.exception';

import { ScheduleService } from '../scheduling/schedule.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService,
  ) {}

  async createClient(createClientDTO: CreateClientDTO): Promise<Client> {
    const { name } = createClientDTO;

    const existentClient = await this.clientRepository.findOne({
      where: { name },
    });

    if (existentClient) {
      throw new ClientExistentException();
    } else {
      const client = this.clientRepository.create(createClientDTO);
      return await this.clientRepository.save(client);
    }
  }

  async getOneClient(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return client;
  }

  async updateClient(
    id: number,
    createClientDTO: CreateClientDTO,
  ): Promise<Client> {
    await this.getOneClient(id);

    await this.clientRepository.update({ id }, createClientDTO);
    const client = await this.getOneClient(id);
    return client;
  }

  async deleteClient(id: number): Promise<void> {
    await this.scheduleService.getRelatedClient(id);
    await this.getOneClient(id);
    await this.clientRepository.delete({ id });
  }
}
