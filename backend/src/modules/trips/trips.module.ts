import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './entities/trip.entity';
import { UsersModule } from '../users/users.module';
import { BusRouteModule } from '../busRoute/busRoute.module';
import { BusesModule } from '../buses/buses.module';

@Module({
  controllers: [TripsController],
  providers: [TripsService],

  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    UsersModule,
    BusRouteModule,
    BusesModule
  ],
  exports: [TripsService]
})
export class TripsModule { }
