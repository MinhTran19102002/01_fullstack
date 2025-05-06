import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusRouteDto } from './dto/create-busRoute.dto';
import { UpdateBusRouteDto } from './dto/update-busRoute.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusRoute } from './entities/busRoute.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BusRouteService {

  constructor(@InjectModel(BusRoute.name) private busRouteModel: Model<BusRoute>) { }

  async create(createBusRouteDto: CreateBusRouteDto) {
    try {
      const { departure, destination, distance, estimatedTime, priceForSleep, priceForSeat, schedules = [] } = createBusRouteDto
      if (departure == destination) {
        throw new BadRequestException("Điểm đi và điểm đến không được giống nhau");
      }
      const exists = await this.busRouteModel.findOne({
        $or: [
          { departure, destination },
          { departure: destination, destination: departure },
        ],
      })
      if (exists) {
        throw new BadRequestException('Tuyến đường này hoặc chiều ngược đã tồn tại!');
      }
      const busRouteCreate = await this.busRouteModel.create({ departure, destination, distance, estimatedTime, schedules, priceForSleep, priceForSeat })
      return busRouteCreate
    } catch (err) {
      throw new BadRequestException(err.message);
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
      const total = await this.busRouteModel.countDocuments(filter);
      const data = await this.busRouteModel.find(filter).skip(skip).limit(limit);
      return {
        data: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };;
    } else {
      const data = await this.busRouteModel.find(filter).select('_id departure destination estimatedTime priceForSeat priceForSleep');
      return data
    }

  }

  async findOne(id: string) {
    return await this.busRouteModel.find({ _id: id });
  }

  async update(updateBusRouteDto: UpdateBusRouteDto) {
    try {
      const { _id, ...updateBusRoute } = updateBusRouteDto
      // return updateBusRoute
      const update = await this.busRouteModel.updateOne({ _id: _id },
        {
          ...updateBusRoute
        })
      console.log(update)
      return update;

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(_id: string) {
    let deleteOne = {}
    if (mongoose.isValidObjectId(_id)) {
      deleteOne = await this.busRouteModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Identifiant invalide")
    }
    return deleteOne;
  }
}
