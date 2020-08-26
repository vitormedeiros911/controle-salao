import { Controller, Get, Post, Body } from '@nestjs/common';

import { ProcedureService } from './procedure.service';
import { Procedure } from './procedure.entity';
import { CreateProcedureDTO } from './DTO/create-procedure.dto';

@Controller('procedure')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}
  @Post("new")
  createProcedure(
    @Body() createProcedureDTO: CreateProcedureDTO,
  ): Promise<Procedure> {
    return this.procedureService.createProcedure(createProcedureDTO);
  }

  @Get()
  getAllProcedures(): Promise<Procedure[]> {
    return this.procedureService.getAllProcedures();
  }
}
