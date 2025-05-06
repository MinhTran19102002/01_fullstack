import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Public } from '@/decorator/customize';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: any) {
    return this.tripsService.findAll(query);
  }

  @Get("/data")
  @Public()
  finData() {
    return this.tripsService.findData();
  }

  @Get("/schedule")
  @Public()
  findSchedule(@Query() query: any) {
    return this.tripsService.findSchedule(query);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.tripsService.remove(_id);
  }


}
