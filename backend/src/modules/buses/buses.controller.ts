import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ResponseMessage, Roles } from '@/decorator/customize';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) { }

  @Post()
  @Roles('admin')
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  @Roles('admin')
  @ResponseMessage('Fetch verify')
  findAll(@Query() query: any, @Request() req) {
    return this.busesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

  @Patch()
  @Roles('admin')
  update(@Body() updateBusDto: UpdateBusDto) {
    return this.busesService.update(updateBusDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') _id: string) {
    return this.busesService.remove(_id);
  }
}
