import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return User.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      phone: createUserDto.phone,
      address: createUserDto.address,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return User.update(
      {
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: updateUserDto.password,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
      },
      { where: { id } },
    );
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
