import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { Procedure } from './procedure.entity';
import { FilterProcedureDTO } from './DTO/filter-procedure.dto';

@EntityRepository(Procedure)
export class ProcedureRepository extends Repository<Procedure> {}
