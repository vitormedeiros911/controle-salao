import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO } from './DTO/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { FilterDTO } from 'src/DTO/filter.dto';
import { ScheduleStatusValidationPipe } from './pipes/status-validation.pipe';
import { ScheduleStatus } from './schedule-status.enum';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post('new')
  @UsePipes(ValidationPipe)
  createSchedule(
    @Body() createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleDTO);
  }

  @Get()
  getAllSchedules(
    @Query(ValidationPipe) filter: FilterDTO,
  ): Promise<Schedule[]> {
    if (filter) {
      return this.scheduleService.getAllSchedules(filter);
    }
    return this.scheduleService.getAllSchedules();
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
