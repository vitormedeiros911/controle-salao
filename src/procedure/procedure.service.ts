import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProcedureRepository } from './procedure.repository';
import { Procedure } from './procedure.entity';
import { CreateProcedureDTO } from './DTO/create-procedure.dto';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(ProcedureRepository)
    private procedureRepository: ProcedureRepository,
  ) {}

  async createProcedure(
    createProcedureDTO: CreateProcedureDTO,
  ): Promise<Procedure> {
    const procedure = await this.procedureRepository.create(createProcedureDTO);
    return this.procedureRepository.save(procedure);
  }

  async getAllProcedures(): Promise<Procedure[]> {
    return this.procedureRepository.find();
  }
}
