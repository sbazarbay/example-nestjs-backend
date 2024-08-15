import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(authDto: AuthDto) {
    // TODO: find user in db by authDto.username
    return this.jwtService.sign({ id: 0, username: 'example' });
  }
}
