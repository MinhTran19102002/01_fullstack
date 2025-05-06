import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  // @IsNotEmpty()
  // address: string;

  // @IsOptional()
  // image: string;
}




export class VerifyCodeDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  codeId: string;
}
