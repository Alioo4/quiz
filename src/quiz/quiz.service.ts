import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(payload: CreateQuizDto) {
    const data = await this.prisma.quiz.create({data: {text: payload.text, description: payload.description, language: payload.language, subCategoryId: payload.subCategoryId}})
    return data.id;
  }

  async findAll() {
    return await this.prisma.quiz.findMany();
  }

  async findOne(id: string) {
    const data = await this.prisma.quiz.findUniqueOrThrow({where: {id}})
    return data;
  }

  async update(id: string, payload: UpdateQuizDto) {
    const data = await this.prisma.quiz.findUniqueOrThrow({where: {id}})

    await this.prisma.quiz.update({where: {id}, data: {text: payload.text, description: payload.description, language: payload.language, subCategoryId: payload.subCategoryId}})
    return null;
  }

  async remove(id: string) {
    await this.prisma.quiz.findUniqueOrThrow({where: {id}})

    await this.prisma.quiz.delete({where: {id}})
    return null;
  }
}
