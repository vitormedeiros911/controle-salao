import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleRepository } from './schedule.repository';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

import { ClientModule } from '../client/client.module';
import { ProcedureModule } from '../procedure/procedure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleRepository]),
    forwardRef(() => ClientModule),
    forwardRef(() => ProcedureModule),
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class SchedulingModule {}
