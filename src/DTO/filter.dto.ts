import { IsOptional, IsNotEmpty } from 'class-validator';

export class FilterDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O filtro não pode estar vazio' })
  search: string;
}
