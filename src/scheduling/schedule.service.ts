import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';
import { ScheduleExistentException } from './scheduleExistent.exception';
import { CannotDeleteEntityException } from '../exception/CannotDeleteEntity.exception';

import { ClientService } from '../client/client.service';
import { ProcedureService } from '../procedure/procedure.service';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => ClientService))
    private clientService: ClientService,
    @Inject(forwardRef(() => ProcedureService))
    private procedureService: ProcedureService,
  ) {}

  async createSchedule(
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    const { date, procedureId, clientId } = createScheduleDTO;

    const existentSchedule = await this.scheduleRepository.findOne({
      where: { date },
    });

    await this.procedureService.getOneProcedure(procedureId);
    await this.clientService.getOneClient(clientId);

    if (existentSchedule) {
      throw new ScheduleExistentException();
    } else {
      const schedule = this.scheduleRepository.create(createScheduleDTO);
      return await this.scheduleRepository.save(schedule);
    }
  }

  async getOneSchedule(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return schedule;
  }

  async updateSchedule(
    id: number,
    createScheduleDTO: Partial<CreateScheduleDTO>,
  ): Promise<Schedule> {
    await this.getOneSchedule(id);

    await this.scheduleRepository.update({ id }, createScheduleDTO);

    const schedule = await this.getOneSchedule(id);
    return schedule;
  }

  async deleteSchedule(id: number): Promise<void> {
    await this.getOneSchedule(id);

    await this.scheduleRepository.delete({ id });
  }

  async getRelatedProcedure(id: number): Promise<void> {
    const found = await this.scheduleRepository.findOne({
      where: { procedureId: id },
    });

    if (found) throw new CannotDeleteEntityException();
  }

  async getRelatedClient(id: number): Promise<void> {
    const found = await this.scheduleRepository.findOne({
      where: { clientId: id },
    });

    if (found) throw new CannotDeleteEntityException();
  }
}
