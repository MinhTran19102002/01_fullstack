
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public, ResponseMessage } from '@/decorator/customize';
import { CreateAuthDto, VerifyCodeDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { IsEmail } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly mailerService: MailerService) { }

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.email, signInDto.password);
  // }



  @Post('login')
  @Public()
  @ResponseMessage('Fetch login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post('register')
  @ResponseMessage('Fetch login')
  @Public()
  async register(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto);
  }



  @Post('verify')
  @ResponseMessage('Fetch verify')
  @Public()
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyCode(verifyCodeDto);
  }


  @Post('retryCode')
  @ResponseMessage('Retry code verify')
  @Public()
  async retryCode(@Body("email") email: string) {
    return this.authService.retryCode(email);
  }




  // @UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }



  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // async logout(@Request() req) {
  //   return req.logout();
  // }

  // @Public()
  // @Get('sendMail')
  // testSendMail() {
  //   this.mailerService
  //     .sendMail({
  //       to: 'minhtc1910@gmail.com', // list of receivers
  //       // from: 'noreply@nestjs.com', // sender address
  //       subject: 'Testing Nest MailerModule ✔', // Subject line

  //       template: './register', // ✅ template found again in v1.6.0
  //       context: {
  //         name: 'minh',
  //         activationCode: 1234,
  //       },
  //     })
  //   return "ok";
  // }

}
