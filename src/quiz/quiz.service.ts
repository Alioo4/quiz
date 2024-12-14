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
    const data = await this.prisma.quiz.create({data: {text: payload.text, description: payload.description, language: payload.language, subCategoryId: payload.subCategoryId, image: payload.image}})
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

  async getQuizzes(query: any) {
    const {
      page = 1,
      limit = 10,
      search,
      subCategoryId,
      isShuffle = 'false',
    } = query;

    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;

    const whereCondition: any = {
      ...(search && {
        OR: [
          { text: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(subCategoryId && { subCategoryId }),
    };

    let quizzes;
    const total = await this.prisma.quiz.count({ where: whereCondition });

    if (isShuffle === 'true') {
      const allQuizzes = await this.prisma.quiz.findMany({
        where: whereCondition,
        include: { option: true },
      });
      quizzes = allQuizzes.sort(() => Math.random() - 0.5).slice(skip, skip + pageSize);
    } else {
      quizzes = await this.prisma.quiz.findMany({
        where: whereCondition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { option: true },
      });
    }

    return {
      data: quizzes,
      meta: {
        total,
        page: pageNumber,
        pageSize: pageSize,
        totalPages: Math.ceil(total / pageSize),
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
