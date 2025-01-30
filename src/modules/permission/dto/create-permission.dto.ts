import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({example: 'uuid'})  
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({example: 'uuid'})  
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
