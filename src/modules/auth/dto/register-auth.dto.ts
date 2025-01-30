import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({ example: 'john007' })
  @MaxLength(32)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john07@' })
  @MaxLength(32)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'john007@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;
}
