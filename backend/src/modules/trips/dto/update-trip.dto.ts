import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { IsEmpty, IsIn } from 'class-validator';

export class UpdateTripDto extends PartialType(CreateTripDto) { }






export class SlotDto {
  @IsEmpty()
  position: string;

  @IsEmpty()
  @IsIn(['guest', 'driver'])
  status: string;
}
