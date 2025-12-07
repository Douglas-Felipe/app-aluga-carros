import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle } from './schemas/vehicle.schema';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const mockVehicleModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getModelToken(Vehicle.name),
          useValue: mockVehicleModel,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
