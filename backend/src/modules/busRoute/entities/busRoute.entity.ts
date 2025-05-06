import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<BusRoute>;

@Schema({ timestamps: true })
export class BusRoute {
  @Prop({ required: true })
  departure: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  estimatedTime: number;

  @Prop({ required: true })
  priceForSleep: number;

  @Prop({ required: true })
  priceForSeat: number;

  @Prop({ required: true, default: [] })
  schedules: string[];

}

export const BusRouteSchema = SchemaFactory.createForClass(BusRoute);

BusRouteSchema.index({ departure: 1, destination: 1 }, { unique: true });