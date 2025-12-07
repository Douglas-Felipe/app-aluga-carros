import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true, unique: true, index: true })
  plate: string;

  @Prop({ default: false })
  isReserved: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
