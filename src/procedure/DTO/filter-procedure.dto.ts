import { IsOptional, IsNotEmpty } from 'class-validator';

export class FilterProcedureDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O filtro não pode estar vazio' })
  search: string;
}
