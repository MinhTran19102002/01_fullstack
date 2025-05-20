import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export class Info {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}


export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  trip: mongoose.Schema.Types.ObjectId;

  @Prop()
  info: Info

  @Prop()
  seats: string[]

  @Prop()
  price: number

  @Prop({ type: Date })
  timeReserved: Date; // thời điểm bắt đầu giữ chỗ

  @Prop({ type: Date })
  timePayment: Date; // thời điểm thanh toán thành công (nếu có)

  @Prop({ required: true, enum: ['reserved', 'paid', 'cancelled'], default: 'reserved' })
  status: string;

  @Prop()
  link_Pay: string;

}


export const PaymentSchema = SchemaFactory.createForClass(Payment);
