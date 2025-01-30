import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
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
}
