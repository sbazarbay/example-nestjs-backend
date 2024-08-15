import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JWTGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() request: Request) {
    return request.user;
  }

  @Get('status')
  @UseGuards(JWTGuard)
  status(@Req() request: Request) {
    return request.user;
  }
}
