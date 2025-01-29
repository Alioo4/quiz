import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiQuery({ name: 'title', required: false, type: String, description: 'Filter by title (partial match)' })
  @ApiQuery({ name: 'categoryId', required: false, type: String, description: 'Filter by category ID' })
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('title') title?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.subCategoryService.findAll({ page, pageSize, title, categoryId });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
