import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota', description: 'Brand of the vehicle' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'Model of the vehicle' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2024, description: 'Year of the vehicle' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: 'ABC-1234', description: 'Plate of the vehicle' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}-?[0-9][0-9A-Z][0-9]{2}$/, {
    message: 'Formato de placa inválido',
  })
  plate: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isReserved?: boolean;
}
