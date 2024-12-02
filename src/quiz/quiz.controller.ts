import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetQuizzesDto } from './dto/query-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiQuery({ name: 'text', required: false, type: String, description: 'Filter by text content (partial match)' })
  @ApiQuery({ name: 'subCategoryId', required: false, type: String, description: 'Filter by SubCategory ID' })
  findAll(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('text') text?: string,
    @Query('subCategoryId') subCategoryId?: string,
  ) {
    return this.quizService.findAll({ page, pageSize, text, subCategoryId });
  }

  @Get('Get-With-Opitions')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'example quiz' })
  @ApiQuery({ name: 'subCategoryId', required: false, type: String, example: 'uuid' })
  @ApiQuery({ name: 'isShuffle', required: false, type: Boolean, example: false })
  @ApiResponse({ status: 200, description: 'List of quizzes' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getQuizzes(@Query() query: GetQuizzesDto) {
    const result = await this.quizService.getQuizzes(query);
    return {
      message: 'Quizzes fetched successfully',
      ...result,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
