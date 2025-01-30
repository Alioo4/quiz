import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto, ResentPasswordDto } from './dto';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/helpers/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async login(payload: LoginAuthDto) {
    const { username, password } = payload;
    const isExist = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
        salt: true,
        role: true,
      },
    });
    if (!isExist) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await this.checkPassword(
      password,
      isExist.salt,
      isExist.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password is not correct');
    }

    return this.getTokens(isExist.id, isExist.role);
  }

  async register(payload: RegisterAuthDto) {
    const { username, password, email } = payload;
    const { salt, hash } = await this.hashPassword(password);

    const isExist = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
        salt: true,
        role: true,
      },
    });
    if (isExist) {
      throw new UnauthorizedException('User already exist');
    }

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hash,
        email,
        salt
      },
    });

    return this.getTokens(user.id, user.role);
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

  hashPassword(pass: string): Promise<{ salt: string; hash: string }> {
    return new Promise((resolve, reject) => {
      try {
        const salt = randomBytes(16).toString('hex');
        const derivedKey = pbkdf2Sync(pass, salt, 12, 64, 'sha512');
        resolve({ salt, hash: derivedKey.toString('hex') });
      } catch (err) {
        reject(err); 
      }
    });
  }

  checkPassword(pass: string, salt: string, hash: string) {
    const hashVerify = new Promise<boolean>((resolve, reject) => {
      try {
        const derivedKey = pbkdf2Sync(pass, salt, 12, 64, 'sha512').toString(
          'hex',
        );
        resolve(hash === derivedKey);
      } catch (err) {
        reject(err);
      }
    });
    return hashVerify;
  }

  async getTokens(userId: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          role,
        },
        {
          secret: 'atSecret',
          expiresIn: 60 * 3,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          role,
        },
        {
          secret: 'atSecret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
