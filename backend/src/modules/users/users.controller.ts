import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, Roles } from '@/decorator/customize';
import { RolesGuard } from '@/modules/auth/passport/roles-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  // Thêm vào mặc định tất cả endpoint  @UseGuards(RolesGuard)

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @ResponseMessage('Fetch verify')
  findAll(@Query() query: any, @Request() req) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @Roles('admin')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') _id: string) {
    return this.usersService.remove(_id);
  }
}
