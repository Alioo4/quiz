import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  @Post()
  register(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }
}
