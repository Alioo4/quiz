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

  async findAll(query: { page?: number; pageSize?: number; text?: string; subCategoryId?: string }) {
    const { page = 1, pageSize = 10, text, subCategoryId } = query;

    const pageNumber = Number(page) || 1;
    const size = Number(pageSize) || 10;
    const skip = (pageNumber - 1) * size;

    const filters: any = {};
    if (text) {
      filters.text = {
        contains: text,
        mode: 'insensitive', 
      };
    }
    if (subCategoryId) {
      filters.subCategoryId = subCategoryId; 
    }

    const [quizzes, totalCount] = await Promise.all([
      this.prisma.quiz.findMany({
        where: filters,
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
        include: { subCategory: true },
      }),
      this.prisma.quiz.count({
        where: filters,
      }),
    ]);

    return {
      data: quizzes,
      meta: {
        total: totalCount,
        page: pageNumber,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
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
