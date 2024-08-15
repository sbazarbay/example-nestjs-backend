import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTGuard } from 'src/auth/guards/jwt.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log();
    const user = await this.usersService.create(createUserDto);
    console.log(`1 item created, id: ${user.id}`);

    return user;
  }

  @Get()
  @UseGuards(JWTGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    console.log(`${users.length} item(s) found`);

    return users;
  }

  @Get(':id')
  @UseGuards(JWTGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    console.log(`Item found, id: ${user.id}`);

    return user;
  }

  @Patch(':id')
  @UseGuards(JWTGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(id, updateUserDto);
    console.log(`Item changed, id: ${id}`);

    return { itemsUpdated: result[0] };
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    console.log(`Item deleted, id: ${id}`);

    return { itemsDeleted: 1 };
  }
}
