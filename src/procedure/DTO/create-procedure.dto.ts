import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProcedureDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do procedimento não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O preço do procedimento não pode estar vazio' })
  cost: number;
}
