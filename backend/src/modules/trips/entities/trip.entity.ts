import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export class Slot {
  @Prop()
  position: string;

  @Prop({ enum: ['available', 'booking', 'occupied'], default: 'available' })
  status: string;

  @Prop({ type: Date })
  timeReserved: Date; // thời điểm bắt đầu giữ chỗ

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  payment: Types.ObjectId;
}


export type TripDocument = HydratedDocument<Trip>;
// export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' })
  bus: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  driver: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute' })
  busRoute: mongoose.Schema.Types.ObjectId;

  @Prop()
  is_outbound: boolean;

  @Prop()
  price: number;

  @Prop()
  departure_time: Date;

  @Prop()
  arrival_time: Date;


  @Prop({ type: [Slot] })
  slots: Slot[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);


