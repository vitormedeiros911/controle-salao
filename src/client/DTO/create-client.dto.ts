import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do cliente não pode estar vazio!' })
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}
