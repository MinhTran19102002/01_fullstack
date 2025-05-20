import { Optional } from '@nestjs/common';
import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsIn(['available', 'booking', 'occupied'])
  role: string;
}
