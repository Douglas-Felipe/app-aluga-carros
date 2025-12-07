import { Test, TestingModule } from '@nestjs/testing';

import { VehiclesSearchService } from './vehicles-search.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { VehicleDocument } from '../vehicles/schemas/vehicle.schema';

describe('VehiclesSearchService', () => {
  let service: VehiclesSearchService;
  let vehiclesService: VehiclesService;

  const vehicleDocument: VehicleDocument = {
    _id: 'any_id',
    brand: 'any_brand',
    model: 'any_model',
    bodywork: 'SUV',
    motor: '1.4',
    seats: 5,
    year: 2024,
    plate: 'ABC-1234',
    isReserved: false,
    photo: 'any_photo',
  } as unknown as VehicleDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<VehiclesSearchService>(VehiclesSearchService);
    vehiclesService = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should call service with correct params', async () => {
      const filter: FilterVehicleDto = {
        brand: 'any_brand',
        model: 'any_model',
        year: 2024,
      };
      const findByQuerySpy = jest
        .spyOn(vehiclesService, 'findByQuery')
        .mockResolvedValueOnce([vehicleDocument]);

      await service.search(filter);

      expect(findByQuerySpy).toHaveBeenCalledWith(filter);
    });

    it('should return filtered vehicles', async () => {
      const filter: FilterVehicleDto = {
        brand: 'any_brand',
        model: 'any_model',
        year: 2024,
      };
      jest
        .spyOn(vehiclesService, 'findByQuery')
        .mockResolvedValueOnce([vehicleDocument]);

      const result = await service.search(filter);

      expect(result).toEqual([vehicleDocument]);
    });
  });
});
