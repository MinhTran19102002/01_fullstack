import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from './entities/bus.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BusesService {

  constructor(@InjectModel(Bus.name) private busModel: Model<Bus>) { }

  async create(createBusDto: CreateBusDto) {
    try {
      const { licensePlate, name, type, capacity } = createBusDto
      const busCreate = await this.busModel.create({ licensePlate, name, type, capacity })
      return busCreate
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
      const total = await this.busModel.countDocuments(filter);
      const data = await this.busModel.find(filter).skip(skip).limit(limit);
      return {
        data: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } else {
      const data = await this.busModel.find(filter).select('_id licensePlate type name')
      return data
    }

  }

  async findOne(id: string) {
    return await this.busModel.findOne({ _id: id });
  }

  async update(updateBusDto: UpdateBusDto) {
    try {
      const { _id, ...updateBus } = updateBusDto
      const update = await this.busModel.updateOne({ _id: _id },
        {
          ...updateBus,
        })
      return update;

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(_id: string) {
    let deleteOne = {}
    if (mongoose.isValidObjectId(_id)) {
      deleteOne = await this.busModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Identifiant invalide")
    }
    return deleteOne;
  }
}
