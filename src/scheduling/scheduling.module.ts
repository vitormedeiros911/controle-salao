import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleRepository } from './schedule.repository';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class SchedulingModule {}
