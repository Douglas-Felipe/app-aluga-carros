import { Test, TestingModule } from '@nestjs/testing';

import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const mockVehiclesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: mockVehiclesService,
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
