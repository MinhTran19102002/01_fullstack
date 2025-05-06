import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BusRouteService } from './busRoute.service';
import { CreateBusRouteDto } from './dto/create-busRoute.dto';
import { UpdateBusRouteDto } from './dto/update-busRoute.dto';
import { Roles } from '@/decorator/customize';

@Controller('busRoutes')
export class BusRouteController {
  constructor(private readonly busRouteService: BusRouteService) { }

  @Post()
  @Roles('admin')
  create(@Body() createBusRouteDto: CreateBusRouteDto) {
    return this.busRouteService.create(createBusRouteDto);
  }

  @Get()
  @Roles('admin')
  findAll(@Query() query: any) {
    return this.busRouteService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busRouteService.findOne(id);
  }

  @Patch()
  @Roles('admin')
  update(@Body() updateBusRouteDto: UpdateBusRouteDto) {
    return this.busRouteService.update(updateBusRouteDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') _id: string) {
    return this.busRouteService.remove(_id);
  }
}
