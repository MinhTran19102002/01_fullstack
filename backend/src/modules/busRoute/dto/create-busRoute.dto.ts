import { Optional } from '@nestjs/common';
import { IsIn, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CreateBusRouteDto {
  @IsNotEmpty()
  departure: string;

  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  distance: number;

  @IsNotEmpty()
  estimatedTime: number;

  @IsNotEmpty()
  priceForSleep: number;

  @IsNotEmpty()
  priceForSeat: number;

  @IsOptional()
  schedules: string[];
}
