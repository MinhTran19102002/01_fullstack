import { Module } from '@nestjs/common';
import { BusRouteService } from './busRoute.service';
import { BusRouteController } from './busRoute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoute, BusRouteSchema } from './entities/busRoute.entity';

@Module({
  controllers: [BusRouteController],
  providers: [BusRouteService],

  imports: [
    MongooseModule.forFeature([{ name: BusRoute.name, schema: BusRouteSchema }]),
  ],
  exports: [BusRouteService]
})
export class BusRouteModule { }
