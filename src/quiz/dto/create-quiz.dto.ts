import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export enum Language {
    UZ = "UZ",
    RU = "RU",
    EN = "EN",
  }

export class CreateQuizDto {
  @ApiProperty({example: "text1"})
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({example: "description1"})
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({example: "UZ"})
  @IsEnum(Language, { message: "Language must be one of: UZ, RU, EN" })
  language: Language;

  @ApiProperty({example: "uuid"})
  @IsUUID()
  @IsNotEmpty()
  subCategoryId: string;
}

