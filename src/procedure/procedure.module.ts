import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { ProcedureRepository } from './procedure.repository';

import { SchedulingModule } from 'src/scheduling/scheduling.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcedureRepository]),
    forwardRef(() => SchedulingModule),
  ],
  controllers: [ProcedureController],
  providers: [ProcedureService],
  exports: [ProcedureService],
})
export class ProcedureModule {}
