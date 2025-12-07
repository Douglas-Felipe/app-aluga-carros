import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<VehicleDocument> {
    try {
      const createdVehicle = new this.vehicleModel(createVehicleDto);
      return await createdVehicle.save();
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code: number }).code === 11000
      ) {
        throw new BadRequestException(
          `Vehicle with plate ${createVehicleDto.plate} already exists.`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<VehicleDocument> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehcile with ID ${id} not found.`);
    }
    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleDocument> {
    const updatedVehicle = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();

    if (!updatedVehicle) {
      throw new NotFoundException(`Veihcile with ID ${id} not found.`);
    }
    return updatedVehicle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Veihcile with ID ${id} not found.`);
    }
  }
}
