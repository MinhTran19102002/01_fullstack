import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { SlotDto, UpdateTripDto } from './dto/update-trip.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slot, Trip } from './entities/trip.entity';
import mongoose, { Model, Types } from 'mongoose';
import { Bus } from '../buses/entities/bus.entity';
import { UsersService } from '../users/users.service';
import { BusesService } from '../buses/buses.service';
import { BusRouteService } from '../busRoute/busRoute.service';
import { User } from '../users/schemas/user.schema';
import { BusRoute } from '../busRoute/entities/busRoute.entity';
import { toVietnamTimeDate } from '@/helper/util';
import dayjs from 'dayjs';

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>, private usersService: UsersService, private busesService: BusesService, private busRouteService: BusRouteService) {

  }
  async create(createTripDto: CreateTripDto) {
    try {
      const { driver, bus, busRoute, departure_time, arrival_time, price, is_outbound } = createTripDto
      const findDriver = await this.usersService.findOne(driver)
      if (!findDriver) {
        throw new BadRequestException("Tài xế không hợp lệ")
      }
      const findBus = await this.busesService.findOne(bus)
      if (!findBus) {
        throw new BadRequestException("Xe không hợp lệ")
      }
      const findBusRoute = await this.busRouteService.findOne(bus)
      if (!findBusRoute) {
        throw new BadRequestException("Tuyến không hợp lệ")
      }
      const isBeforeNow = dayjs().isAfter(dayjs(departure_time));
      if (isBeforeNow) {
        throw new BadRequestException("Thời gian không hợp lệ")
      }
      const departure = toVietnamTimeDate(departure_time)
      const arrival = toVietnamTimeDate(arrival_time)
      let slots: SlotDto[] = [];
      if (findBus.capacity === 45) {
        for (let i = 1; i <= 45; i++) {
          const position = `A${String(i).padStart(2, "0")}`; // A01, A02, ..., A45
          slots.push({
            position,
            status: "available"
          });
        }
      } else if (findBus.capacity === 40) {
        ["A", "B"].forEach(prefix => {
          for (let i = 1; i <= 20; i++) {
            const position = `${prefix}${String(i).padStart(2, "0")}`; // A01, A02, ..., B20
            slots.push({
              position,
              status: "available"
            });
          }
        });
      }
      const newTrip = await this.tripModel.create({
        bus, busRoute, departure_time: departure, arrival_time: arrival, is_outbound, driver, price, slots
      })

      return departure;
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }
  async findData() {
    const bus = await this.busesService.findAll({ select: false })
    const busRoute = await this.busRouteService.findAll({ select: false })
    const user = await this.usersService.findAll({ role: "driver", select: false })
    return {
      bus, busRoute, user
    }
  }
  async findAll(query: any) {
    let { page, limit, select = true, ...params } = query
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }
    const skip = (page - 1) * limit;
    let filter = {};
    for (let [key, value] of Object.entries(params)) {
      let regex: any;
      if (key == 'name') {
        regex = {
          [key]: new RegExp(`${value}`, 'i'),
        };
      } else {
        regex = {
          [key]: new RegExp(`^${value}`, 'i'),
        };
      }
      Object.assign(filter, regex);
    }

    if (select) {
      const total = await this.tripModel.countDocuments(filter);
      const data = await this.tripModel.find(filter).skip(skip).limit(limit)
        .populate<{ bus: Bus }>("bus")
        .populate<{ driver: User }>({ path: "driver", select: "-password" })
        .populate<{ busRoute: BusRoute }>("busRoute");
      return {
        data: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };;
    } else {
      const data = await this.tripModel.find(filter);
      return data
    }

  }



  async findSchedule(query: any) {
    let { page, limit, day, departure = '', destination = '', ...params } = query
    const startDay = new Date(day);
    const endDay = new Date(startDay.getTime() + 24 * 60 * 60 * 1000);

    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }
    const skip = (page - 1) * limit;
    let filter = {};
    for (let [key, value] of Object.entries(params)) {
      let regex: any;
      if (key == 'name') {
        regex = {
          [key]: new RegExp(`${value}`, 'i'),
        };
      } else {
        regex = {
          [key]: new RegExp(`^${value}`, 'i'),
        };
      }
      Object.assign(filter, regex);
    }

    const matchCondition = {
      ...filter,
      departure_time: {
        $gte: startDay,
        $lt: endDay,
      },
      ...(departure && { 'busRoute.departure': departure }),
      ...(destination && { 'busRoute.destination': destination }),
    };
    const countResult = await this.tripModel.aggregate([
      {
        $lookup: {
          from: 'busroutes',
          localField: 'busRoute',
          foreignField: '_id',
          as: 'busRoute',
        },
      },
      { $unwind: '$busRoute' },
      { $match: matchCondition },
      { $count: 'total' },
    ]);
    const total = countResult[0]?.total || 0;
    const data = await this.tripModel.aggregate([
      // JOIN với bảng busRoute
      {
        $lookup: {
          from: 'busroutes', // tên collection thật trong MongoDB (viết thường, số nhiều)
          localField: 'busRoute',
          foreignField: '_id',
          as: 'busRoute',
        },
      },
      {
        $unwind: '$busRoute', // bóc tách mảng về object để filter dễ
      },
      // FILTER departure & destination
      {
        $match: {
          ...filter,
          departure_time: {
            $gte: startDay,
            $lt: endDay,
          },
          ...(departure && { 'busRoute.departure': departure }),
          ...(destination && { 'busRoute.destination': destination }),
        },
      },
      // JOIN thêm bus
      {
        $lookup: {
          from: 'buses',
          localField: 'bus',
          foreignField: '_id',
          as: 'bus',
        },
      },
      { $unwind: '$bus' },

      // JOIN thêm driver
      {
        $lookup: {
          from: 'users',
          localField: 'driver',
          foreignField: '_id',
          as: 'driver',
        },
      },
      { $unwind: '$driver' },
      {
        $project: {
          'driver.password': 0, // loại bỏ password
        },
      },
      // Pagination
      { $skip: skip },
      { $limit: limit },
    ]);

    return {
      data: data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

  }

  async findOne(id: string) {
    try {
      if (mongoose.isValidObjectId(id)) {
        const data = await this.tripModel.findById(id)
          .populate<{ bus: Bus }>("bus")
          .populate<{ driver: User }>({ path: "driver", select: "-password" })
          .populate<{ busRoute: BusRoute }>("busRoute");
        if (!data) {
          throw new BadGatewayException()
        }
        return data;
      } else {
        throw new BadGatewayException()
      }

    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  async remove(_id: string) {
    let deleteOne = {}
    if (mongoose.isValidObjectId(_id)) {
      deleteOne = await this.tripModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Identifiant invalide")
    }
    return deleteOne;
  }

  async updateSlotsStatus(
    tripId: string,
    selectedSeats: string[],
    status: 'available' | 'booking' | 'occupied',
    paymentId?: mongoose.Types.ObjectId,
    timeReserved?: Date,
  ) {
    // const trip = await this.tripModel.findById(tripId);
    // if (!trip) { throw new BadGatewayException('Trip not found'); }

    // Cập nhật từng slot được chọn
    const update = await this.tripModel.updateOne(
      { _id: tripId, 'slots.position': { $in: selectedSeats } },
      {
        $set: {
          'slots.$[elem].status': status,
          ...(paymentId && { 'slots.$[elem].payment': paymentId }),
          ...(timeReserved && { 'slots.$[elem].timeReserved': timeReserved }),
        }
      },
      {
        arrayFilters: [{ 'elem.position': { $in: selectedSeats } }]
      }
    );

    return update;
  }

}
