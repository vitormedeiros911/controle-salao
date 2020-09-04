import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProcedureRepository } from './procedure.repository';
import { Procedure } from './procedure.entity';
import { CreateProcedureDTO } from './DTO/create-procedure.dto';
import { ProcedureExistentException } from './procedureExistent.exception';
import { CannotDeleteEntityException } from 'src/exception/CannotDeleteEntity.exception';

import { ScheduleService } from 'src/scheduling/schedule.service';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(ProcedureRepository)
    private procedureRepository: ProcedureRepository,
    private scheduleService: ScheduleService,
  ) {}

  async createProcedure(
    createProcedureDTO: CreateProcedureDTO,
  ): Promise<Procedure> {
    const { name } = createProcedureDTO;

    const existentProcedure: Procedure = await this.procedureRepository.findOne(
      {
        where: { name },
      },
    );

    if (existentProcedure) {
      throw new ProcedureExistentException();
    } else {
      const procedure = this.procedureRepository.create(createProcedureDTO);
      return await this.procedureRepository.save(procedure);
    }
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
    const relatedProcedure = await this.scheduleService.getRelatedProcedure(id);

    if (relatedProcedure) {
      throw new CannotDeleteEntityException();
    } else {
      await this.getOneProcedure(id);
      await this.procedureRepository.delete({ id });
    }
  }
}
