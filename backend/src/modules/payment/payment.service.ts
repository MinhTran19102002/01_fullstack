import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { createVnpayPaymentUrl, verifyVnpayReturn } from '@/helper/util';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './entities/payment.entity';
import { privateDecrypt } from 'crypto';
import { Model, Types } from 'mongoose';
import { TripsService } from '../trips/trips.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>, private tripService: TripsService,
    private userService: UsersService) {

  }
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async xoa() {
    await this.paymentModel.deleteMany({});
  }


  async getPaymentUrl(data: CreatePaymentDto) {
    try {
      const { name, phone, email, selectedSeats, tripId } = data
      const now = new Date();
      const newId = new Types.ObjectId();
      const trip = await this.tripService.findOne(tripId)
      const amount = trip.price * selectedSeats.length


      //Kiem tra thong tin cho
      const selectedSlots = trip.slots.filter(slot => selectedSeats.includes(slot.position));
      // console.log(selectedSlots)

      // Kiểm tra xem có slot nào không phải 'available' không
      const hasUnavailable = selectedSlots.some(slot => slot.status !== 'available');
      if (hasUnavailable) {
        console.log('1111111111')
        throw new BadRequestException("Thời gian không hợp lệ")
      }
      // tao link thanh toan
      const link = createVnpayPaymentUrl({ orderId: newId.toHexString(), amount });
      //Tao thong tin thanh toan
      let dataPayment = {
        trip: trip._id,
        info: { name, phone, email },
        seats: selectedSeats, price: amount, timeReserved: now, status: 'reserved', link_Pay: link
      }
      const user = await this.userService.findOneByEmail(email)
      if (user) {
        await this.paymentModel.create({ ...dataPayment, user: user._id })
      }
      else {
        await this.paymentModel.create({ ...dataPayment })
      }

      //Dat cho cho no
      const test = await this.tripService.updateSlotsStatus(trip._id.toHexString(), selectedSeats, 'booking', newId, now)
      // console.log(test)
      // console.log(link)
      return link
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  verify(query: Record<string, any>) {
    return verifyVnpayReturn(query);
  }

}
