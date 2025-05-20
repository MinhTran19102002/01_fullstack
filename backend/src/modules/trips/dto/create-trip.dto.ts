
import { IsDateString, IsIn, IsMongoId, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CreateTripDto {
  @IsMongoId()
  @IsNotEmpty()
  bus: string;

  @IsMongoId()
  @IsNotEmpty()
  driver: string;

  @IsMongoId()
  @IsNotEmpty()
  busRoute: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  is_outbound: boolean;

  @IsDateString()
  @IsNotEmpty()
  departure_time: Date;

  @IsDateString()
  @IsNotEmpty()
  arrival_time: Date;
}
