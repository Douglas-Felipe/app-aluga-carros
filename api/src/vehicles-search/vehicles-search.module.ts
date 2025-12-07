import { Module } from '@nestjs/common';

import { VehiclesSearchController } from './vehicles-search.controller';
import { VehiclesSearchService } from './vehicles-search.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [VehiclesSearchController],
  providers: [VehiclesSearchService],
})
export class VehiclesSearchModule {}
