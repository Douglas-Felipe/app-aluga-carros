import { Test, TestingModule } from '@nestjs/testing';

import { VehiclesSearchController } from './vehicles-search.controller';
import { VehiclesSearchService } from './vehicles-search.service';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { VehicleDocument } from '../vehicles/schemas/vehicle.schema';
import { VehiclesService } from './../vehicles/vehicles.service';

describe('VehiclesSearchController', () => {
  let controller: VehiclesSearchController;
  let service: VehiclesSearchService;

  const vehicleMock = {
    brand: 'Fiat',
    model: 'Uno',
    bodywork: 'hatch',
    motor: '1.0',
    seats: 5,
    year: 2010,
    plate: 'ABC-1234',
    isReserved: false,
    photo: 'base64-encoded-photo',
  } as unknown as VehicleDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesSearchController],
      providers: [
        VehiclesSearchService,
        {
          provide: VehiclesService,
          useValue: {
            findByQuery: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehiclesSearchController>(VehiclesSearchController);
    service = module.get<VehiclesSearchService>(VehiclesSearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should return an array of vehicles', async () => {
      const params: FilterVehicleDto = { brand: 'Fiat' };
      const result = { data: [vehicleMock] };

      const serviceSearchSpy = jest.spyOn(service, 'search');
      serviceSearchSpy.mockResolvedValueOnce([vehicleMock]);

      const response = await controller.search(params);

      expect(response).toEqual(result);
      expect(serviceSearchSpy).toHaveBeenCalledWith(params);
    });
  });
});
