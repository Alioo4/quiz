import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto, ResentPasswordDto} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  @Post('register')
  register(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }

  @Patch('resent-password')
  resentPassword(@Body() payload: ResentPasswordDto) {
    return this.authService.resentPassword(payload);
  }
}
