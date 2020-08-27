import { Controller, Get, Body, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';
import { Schedule } from './schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post('new')
  createSchedule(
    @Body() createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleDTO);
  }
}
