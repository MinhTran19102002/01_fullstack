import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsMongoId
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  // @Matches(/^(0|\+84)\d{9,10}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Danh sách ghế không được rỗng' })
  @IsString({ each: true }) // kiểm tra từng phần tử là string
  selectedSeats: string[];

  @IsNotEmpty()
  @IsMongoId()
  tripId: string;
}
