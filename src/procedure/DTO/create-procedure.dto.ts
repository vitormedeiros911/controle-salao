import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProcedureDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do procedimento não pode estar vazio' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O preço do procedimento não pode estar vazio' })
  @Type(() => Number)
  cost: number;
}
