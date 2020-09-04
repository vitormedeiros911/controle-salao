import { Repository, EntityRepository } from 'typeorm';

import { Client } from './cliente.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
