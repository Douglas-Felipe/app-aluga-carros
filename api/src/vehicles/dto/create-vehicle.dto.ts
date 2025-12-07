import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota', description: 'Brand of the vehicle' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'Model of the vehicle' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Sedan', description: 'Bodywork of the vehicle' })
  @IsString()
  @IsNotEmpty()
  bodywork: string;

  @ApiProperty({ example: '1.4', description: 'Motor of the vehicle' })
  @IsString()
  @IsNotEmpty()
  motor: string;

  @ApiProperty({ example: 4, description: 'Number of seats of the vehicle' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  seats: number;

  @ApiProperty({ example: 2024, description: 'Year of the vehicle' })
  @Type(() => Number)
  @IsInt()
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
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isReserved?: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: true })
  @IsString()
  @IsNotEmpty()
  photo: string;
}
