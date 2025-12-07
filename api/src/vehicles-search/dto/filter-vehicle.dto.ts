import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { CreateVehicleDto } from '../../vehicles/dto/create-vehicle.dto';

export class FilterVehicleDto extends PartialType(
  OmitType(CreateVehicleDto, ['photo']),
) {}

export class FilteredVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiProperty({ example: 'vehicle-id', description: 'Vehicle ID' })
  _id: string;
}

export class FilteredVehicleDtoResponse {
  @ApiProperty({ type: [FilteredVehicleDto] })
  data: FilteredVehicleDto[];
}
