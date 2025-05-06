import { PartialType } from '@nestjs/mapped-types';
import { CreateBusDto } from './create-bus.dto';
import { IsIn, IsNotEmpty, Matches } from 'class-validator';

export class UpdateBusDto {

  @IsNotEmpty()
  _id: string;

  // @IsNotEmpty()
  // @Matches(/^Xe-[0-9]{2}$/, { message: 'Tên phải theo định dạng Xe-01' })
  // name: string;

  @IsNotEmpty()
  @Matches(/^\d{2}[A-Z]-\d{5}$/, { message: 'Biển số phải theo định dạng 12A-12345' })
  licensePlate: string;

  @IsNotEmpty()
  capacity: number;

  @IsIn(['seat', 'bed'])
  type: string;
}
