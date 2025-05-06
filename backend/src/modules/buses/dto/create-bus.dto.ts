import { Optional } from '@nestjs/common';
import { IsIn, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CreateBusDto {
  @IsNotEmpty()
  @Matches(/^Xe-[0-9]{2}$/, { message: 'Tên phải theo định dạng Xe-01' })
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{2}[A-Z]-\d{5}$/, { message: 'Biển số phải theo định dạng 12A-12345' })
  licensePlate: string;

  @IsNotEmpty()
  capacity: number;

  @IsIn(['seat', 'bed'])
  type: string;
}
