
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Bus>;
// export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class Bus {
  @Prop({ required: true, unique: true, match: /^Xe-[0-9]{2}$/, })
  name: string;

  @Prop({ required: true, unique: true, match: /^[0-9]{2}[A-Z]-[0-9]{5}$/, })
  licensePlate: string;

  @Prop({ enum: ['seat', 'bed'], default: 'seat' })
  type: string;

  @Prop({ required: true })
  capacity: number;

  @Prop()
  imamge: string;

}

export const BusSchema = SchemaFactory.createForClass(Bus);
