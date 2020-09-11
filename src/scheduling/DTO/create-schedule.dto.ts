import { ScheduleStatus } from '../schedule-status.enum';
import {
  IsDate,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDTO {
  @IsDate()
  @IsNotEmpty({ message: 'A data do agendamento não pode ser vazia!' })
  @Type(() => Date)
  date: Date;

  @IsNotEmpty({ message: 'O horário do agendamento não pode ser vazio!' })
  @Type(() => Date)
  time: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Selecione um procedimento!' })
  @Type(() => Number)
  procedureId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Selecione um cliente!' })
  @Type(() => Number)
  clientId: number;

  @IsOptional()
  @IsString()
  status?: ScheduleStatus;
}
