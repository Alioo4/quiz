import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "Title1"})
    @IsString()
    @IsNotEmpty()
    title: string
}
