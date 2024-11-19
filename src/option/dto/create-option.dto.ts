import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOptionDto {
    @ApiProperty({example: 'text1'})
    @IsString()
    @IsNotEmpty()
    text: string;
  
    @ApiProperty({example: false})
    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean;
  
    @ApiProperty({example: "uuid"})
    @IsUUID()
    @IsNotEmpty()
    quizId: string;
  }