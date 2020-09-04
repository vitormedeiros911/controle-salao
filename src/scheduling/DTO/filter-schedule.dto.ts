import { ScheduleStatus } from '../schedule-status.enum';
import { IsDate, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterScheduleDTO {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsString()
  status: ScheduleStatus;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  procedureId: number;
}
