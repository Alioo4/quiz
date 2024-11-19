import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateSubCategoryDto {
    @ApiProperty({example: "Title1"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "2991a019-ac97-44fe-b8b9-00ec449ee14f"})
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
