import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.usersService.findOneByUsernameAndPassword(
      authDto.username,
      authDto.password,
    );
    if (!user) return user;
    return {
      id: user.id,
      username: user.username,
      accessToken: this.jwtService.sign({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
