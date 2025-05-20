import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Global } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from '@/decorator/customize';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Public()
  @Post('create')
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.getPaymentUrl(createPaymentDto);
  }

  @Public()
  @Get('return')
  handleReturn(@Query() query: Record<string, any>) {
    const result = this.paymentService.verify(query);
    return result
  }

  @Public()
  @Get('/xoa')
  xoa() {
    return this.paymentService.xoa();
  }



  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }



}
