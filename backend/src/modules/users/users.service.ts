import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from '@/helper/util';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { CreateAuthDto, VerifyCodeDto } from '@/modules/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly mailerService: MailerService) { }

  async create(createUserDto: CreateUserDto) {
    const { name, password, email, phone, address, role = "guest" } = createUserDto
    const hashPassword = await hashPasswordHelper(createUserDto.password)
    const userCreate = await this.userModel.create({
      name, email, phone, address, password: hashPassword, is_active: true, role
    });
    return { _id: userCreate._id };
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
      const total = await this.userModel.countDocuments(filter);
      const users = await this.userModel.find(filter).select('-password').skip(skip).limit(limit);
      return {
        data: users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } else {
      const users = await this.userModel.find(filter).select('_id name email');
      return users
    }

  }

  async findOne(id: string) {
    const user = this.userModel.findOne({ _id: id, role: "driver" })
    return user;
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const update = await this.userModel.updateOne({ _id: updateUserDto._id },
        {
          name: updateUserDto.name,
          phone: updateUserDto.phone,
          address: updateUserDto.address,
          image: updateUserDto.image,
        })
      return update;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async remove(_id: string) {
    let deleteOne
    console.log(_id)
    if (mongoose.isValidObjectId(_id)) {
      deleteOne = await this.userModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("Identifiant invalide")
    }
    return deleteOne;
  }

  async registerUser(registerUser: CreateAuthDto) {
    const { name, password, email, phone } = registerUser
    const hashPassword = await hashPasswordHelper(password)
    const userCreate = await this.userModel.create({
      name, email, phone, password: hashPassword,
      is_active: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'day'),
    });

    // send email


    this.mailerService
      .sendMail({
        to: userCreate.email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Xác nhận code', // Subject line

        template: './register', // ✅ template found again in v1.6.0
        context: {
          name: 'Tran Minh',
          activationCode: userCreate.codeId,
        },
      })


    return { _id: userCreate._id };
  }


  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const { _id, codeId } = verifyCodeDto
    const user = await this.userModel.findOne({ _id, codeId })
    if (user?.is_active == true) {
      throw new BadRequestException("Tài khoản đã xác thực")
    }
    if (!user) {
      throw new BadRequestException("Code không chính xác")
    } else {
      const checkExpired = dayjs().isBefore(user.codeExpired)
      if (!checkExpired) {
        throw new BadRequestException("Code hết hạn")
      }
    }
    const update = await this.userModel.updateOne({ _id }, { is_active: true })


    return update;
  }



  async retryCode(email: string) {
    const user = await this.userModel.findOne({ email })
    const _id = user?._id
    if (!user) {
      throw new BadRequestException("Email không tồn tại")
    }
    if (user?.is_active == true) {
      throw new BadRequestException("Tài khoản đã xác thực")
    }

    const codeId = uuidv4()
    const update = await this.userModel.updateOne({ email }, { is_active: false, codeId, codeExpired: dayjs().add(1, 'day'), })

    this.mailerService
      .sendMail({
        to: email, // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Xác nhận code', // Subject line

        template: './register', // ✅ template found again in v1.6.0
        context: {
          name: 'Tran Minh',
          activationCode: codeId,
        },
      })

    return { _id };
  }
}
