import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getOneProcedure(id: number): Promise<Procedure> {
    const procedure = await this.procedureRepository.findOne({ where: { id } });

    if (!procedure) {
      throw new NotFoundException('Procedimento não encontrado');
    }

    return procedure;
  }

  async updateProcedure(
    id: number,
    createProcedureDTO: Partial<CreateProcedureDTO>,
  ): Promise<Procedure> {
    await this.getOneProcedure(id);

    await this.procedureRepository.update({ id }, createProcedureDTO);
    const procedure = await this.getOneProcedure(id);
    return procedure;
  }

  async deleteProcedure(id: number): Promise<void> {
    await this.getOneProcedure(id);

    this.procedureRepository.delete({ id });
  }
}
