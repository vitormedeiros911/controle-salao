import { Repository, EntityRepository } from 'typeorm';

import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
