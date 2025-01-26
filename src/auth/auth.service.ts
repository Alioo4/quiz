import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto, ResentPasswordDto } from './dto';
import { pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  login(payload: LoginAuthDto) {
    return 'This action adds a new auth';
  }

  register(payload: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

  logout() {
    return 'This action adds a new auth';
  }

  refresh() {
    return 'This action adds a new auth';
  }

  resentPassword(payload: ResentPasswordDto) {
    return 'This action adds a new auth';
  }

  hashPassword(pass: string){
    const salt = randomBytes(16).toString('hex');
    const hash = new Promise<{ salt: string; hash: string }>((resolve, reject) => {
      try {
        const derivedKey = pbkdf2Sync(pass, salt, 12, 64, 'sha512');
        resolve({ salt, hash: derivedKey.toString('hex') });
      } catch (err) {
        reject(err);
      }
  });
    return { salt, hash };
  }

  checkPassword(pass:string, salt:string, hash:string){
    const hashVerify = new Promise<boolean>((resolve, reject) => {
      try {
        const derivedKey = pbkdf2Sync(pass, salt, 12, 64, 'sha512').toString('hex');
        resolve(hash === derivedKey);
      } catch (err) {
        reject(err);
      }
    });
    return hashVerify;
  }
}
