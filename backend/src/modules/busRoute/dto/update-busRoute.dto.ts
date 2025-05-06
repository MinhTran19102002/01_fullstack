import { PartialType } from '@nestjs/mapped-types';
import { CreateBusRouteDto } from './create-busRoute.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBusRouteDto {
  @IsNotEmpty()
  _id: string;


  // @IsNotEmpty()
  // departure: string;

  // @IsNotEmpty()
  // destination: string;

  @IsOptional()
  distance: number;

  @IsOptional()
  estimatedTime: number;


  @IsOptional()
  priceForSleep: number;

  @IsOptional()
  priceForSeat: number;


  @IsOptional()
  schedules: string[];
}
