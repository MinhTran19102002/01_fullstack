
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helper/util';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, VerifyCodeDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const checkPass = await comparePasswordHelper(pass, user.password)
    if (!checkPass) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id, name: user.name, email: user.email, role: user.role };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
        role: user.role
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const checkPass = await comparePasswordHelper(pass, user.password)
    if (!checkPass) {
      throw new UnauthorizedException();
    }


    const payload = { sub: user._id, name: user.name, email: user.email };

    const access_token = await this.jwtService.signAsync(payload)
    return { access_token };
  }
  async register(registerDto: CreateAuthDto): Promise<any> {
    return this.usersService.registerUser(registerDto);
  }


  async verifyCode(verifyCodeDto: VerifyCodeDto): Promise<any> {
    return this.usersService.verifyCode(verifyCodeDto);
  }

  async retryCode(email: string): Promise<any> {
    return this.usersService.retryCode(email);
  }
}
