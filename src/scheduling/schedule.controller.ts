import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { ScheduleStatusValidationPipe } from './pipes/status-validation.pipe';
import { ScheduleStatus } from './schedule-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { FilterScheduleDTO } from './DTO/filter-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: ScheduleRepository,
    private scheduleService: ScheduleService,
  ) {}

  @Post('new')
  createSchedule(
    @Body() createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleDTO);
  }

  @Get()
  async getAllSchedules(
    @Query() filter: FilterScheduleDTO,
  ): Promise<Schedule[]> {
    if (filter.date) {
      return await this.scheduleRepository.find({
        where: { date: filter.date },
      });
    } else if (filter.procedureId) {
      return await this.scheduleRepository.find({
        where: { procedureId: filter.procedureId },
      });
    } else if (filter.status) {
      return await this.scheduleRepository.find({
        where: { status: filter.status },
      });
    } else {
      return await this.scheduleRepository.find();
    }
  }

  @Get(':id')
  getOneSchedule(@Param('id', ParseIntPipe) id: number): Promise<Schedule> {
    return this.scheduleService.getOneSchedule(id);
  }

  @Patch('edit/:id')
  updateSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() createScheduleDTO: Partial<CreateScheduleDTO>,
    @Body('status', ScheduleStatusValidationPipe) status: ScheduleStatus,
  ): Promise<Schedule> {
    if (status) {
      createScheduleDTO.status = status;
    }
    return this.scheduleService.updateSchedule(id, createScheduleDTO);
  }

  @Delete(':id')
  deleteSchedule(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.scheduleService.deleteSchedule(id);
  }
}
