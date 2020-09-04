import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';
import { ScheduleExistentException } from './scheduleExistent.exception';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async createSchedule(
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    const { date } = createScheduleDTO;

    const existentSchedule = await this.scheduleRepository.findOne({
      where: { date },
    });

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

  async getRelatedProcedure(id: number): Promise<boolean> {
    const found = await this.scheduleRepository.findOne({
      where: { procedureId: id },
    });

    if (found) return true;

    return false;
  }
}
