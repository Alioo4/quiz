import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@Injectable()
export class AuthService {
  login(payload: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  register(payload: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

}
