import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { ProcedureRepository } from './procedure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProcedureRepository])],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
