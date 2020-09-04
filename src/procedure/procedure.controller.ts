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
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProcedureService } from './procedure.service';
import { Procedure } from './procedure.entity';
import { CreateProcedureDTO } from './DTO/create-procedure.dto';
import { FilterDTO } from '../DTO/filter.dto';
import { ProcedureRepository } from './procedure.repository';

@Controller('procedure')
export class ProcedureController {
  constructor(
    @InjectRepository(ProcedureRepository)
    private procedureRepository: ProcedureRepository,
    private procedureService: ProcedureService,
  ) {}

  @Post('new')
  @UsePipes()
  createProcedure(
    @Body() createProcedureDTO: CreateProcedureDTO,
  ): Promise<Procedure> {
    return this.procedureService.createProcedure(createProcedureDTO);
  }

  @Get()
  async getAllProcedures(@Query() filter: FilterDTO): Promise<Procedure[]> {
    if (filter.search) {
      return await this.procedureRepository.find({
        where: { name: filter.search },
      });
    }

    return await this.procedureRepository.find();
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
