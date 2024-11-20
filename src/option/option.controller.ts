import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiQuery({ name: 'text', required: false, type: String, description: 'Filter by text content (partial match)' })
  @ApiQuery({ name: 'quizId', required: false, type: String, description: 'Filter by Quiz ID' })
  @ApiQuery({ name: 'isCorrect', required: false, type: Boolean, description: 'Filter by correctness (true or false)' })
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('text') text?: string,
    @Query('quizId') quizId?: string,
    @Query('isCorrect') isCorrect?: boolean,
  ) {
    return this.optionService.findAll({ page, pageSize, text, quizId, isCorrect });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
