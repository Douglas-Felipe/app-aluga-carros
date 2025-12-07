import { Injectable } from '@nestjs/common';

import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { VehicleDocument } from '../vehicles/schemas/vehicle.schema';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class VehiclesSearchService {
  constructor(private VehiclesService: VehiclesService) {}

  search(params: FilterVehicleDto): Promise<VehicleDocument[]> {
    return this.VehiclesService.findByQuery({ ...params });
  }
}
