import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';

import { ProcedureService } from './procedure.service';
import { Procedure } from './procedure.entity';
import { CreateProcedureDTO } from './DTO/create-procedure.dto';
import { FilterProcedureDTO } from './DTO/filter-procedure.dto';

@Controller('procedure')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}
  @Post('new')
  @UsePipes(ValidationPipe)
  createProcedure(
    @Body() createProcedureDTO: CreateProcedureDTO,
  ): Promise<Procedure> {
    return this.procedureService.createProcedure(createProcedureDTO);
  }

  @Get()
  getAllProcedures(
    @Query(ValidationPipe) filter: FilterProcedureDTO,
  ): Promise<Procedure[]> {
    if (filter) {
      return this.procedureService.getAllProcedures(filter);
    }
    return this.procedureService.getAllProcedures();
  }

  @Get(':id')
  getOneProcedure(@Param('id', ParseIntPipe) id: number): Promise<Procedure> {
    return this.procedureService.getOneProcedure(id);
  }

  @Patch('edit/:id')
  updateProcedure(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProcedureDTO: Partial<CreateProcedureDTO>,
  ): Promise<Procedure> {
    return this.procedureService.updateProcedure(id, createProcedureDTO);
  }

  @Delete(':id')
  deleteProcedure(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.procedureService.deleteProcedure(id);
  }
}
