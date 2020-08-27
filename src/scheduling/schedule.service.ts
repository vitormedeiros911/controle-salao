import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async createSchedule(createScheduleDTO: CreateScheduleDTO): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(createScheduleDTO);
    return await this.scheduleRepository.save(schedule);
  }
}
