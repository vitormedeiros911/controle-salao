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

  @IsString()
  @IsNotEmpty({ message: "O cliente deve ser informado!"})
  client: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Selecione um procedimento!' })
  @Type(() => Number)
  procedureId: number;

  @IsOptional()
  @IsString()
  status?: ScheduleStatus;
}
