import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { VehiclesSearchService } from './vehicles-search.service';
import {
  FilterVehicleDto,
  FilteredVehicleDtoResponse,
} from './dto/filter-vehicle.dto';

@ApiTags('vehicles-search')
@ApiBearerAuth()
@Controller('vehicles/search')
export class VehiclesSearchController {
  constructor(private readonly vehiclesSearchService: VehiclesSearchService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of vehicles based on search parameters. ',
  })
  @ApiResponse({
    status: 200,
    description: 'List of vehicles.',
    type: FilteredVehicleDtoResponse,
  })
  async search(@Query() params: FilterVehicleDto) {
    const response = {
      data: await this.vehiclesSearchService.search(params),
    };

    return response;
  }
}
