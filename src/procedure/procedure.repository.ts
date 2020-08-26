import { Repository, EntityRepository } from 'typeorm';

import { Procedure } from './procedure.entity';

@EntityRepository(Procedure)
export class ProcedureRepository extends Repository<Procedure> {}
