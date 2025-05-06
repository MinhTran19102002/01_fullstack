import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from './entities/bus.entity';

@Module({
  controllers: [BusesController],
  providers: [BusesService],
  // imports: [DatabaseModule.forRoot([User])],,
  imports: [
    MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }]),
  ],
  exports: [BusesService]
})
export class BusesModule { }
