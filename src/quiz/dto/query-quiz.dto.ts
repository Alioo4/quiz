import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetQuizzesDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  subCategoryId?: string;

  @IsOptional()
  isShuffle?: boolean;
}
