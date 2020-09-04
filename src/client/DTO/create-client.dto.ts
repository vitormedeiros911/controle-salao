import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateClientDTO {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome do cliente não pode estar vazio!' })
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'O telefone deve conter no mínimo 8 caracteres' })
  @MaxLength(15, { message: 'O telefone deve conter no máximo 15 caracteres' })
  phone: string;
}
