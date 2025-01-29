import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from 'src/helpers/prisma';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateOptionDto) {
    const data = await this.prisma.option.create({
      data: {
        text: payload.text,
        isCorrect: payload.isCorrect,
        quizId: payload.quizId,
      },
    });
    return data.id;
  }

  async findAll(query: {
    page?: number;
    pageSize?: number;
    text?: string;
    quizId?: string;
    isCorrect?: boolean;
  }) {
    const { page = 1, pageSize = 10, text, quizId, isCorrect } = query;

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
    if (quizId) {
      filters.quizId = quizId;
    }
    if (typeof isCorrect === 'boolean') {
      filters.isCorrect = isCorrect;
    }

    const [options, totalCount] = await Promise.all([
      this.prisma.option.findMany({
        where: filters,
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
        include: { quiz: true },
      }),
      this.prisma.option.count({
        where: filters,
      }),
    ]);

    return {
      data: options,
      meta: {
        total: totalCount,
        page: pageNumber,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.option.findUniqueOrThrow({ where: { id } });
    return data;
  }

  async update(id: string, payload: UpdateOptionDto) {
    const data = await this.prisma.option.findUniqueOrThrow({ where: { id } });

    await this.prisma.option.update({
      where: { id },
      data: {
        text: payload.text,
        isCorrect: payload.isCorrect,
        quizId: payload.quizId,
      },
    });
    return null;
  }

  async remove(id: string) {
    await this.prisma.option.findUniqueOrThrow({ where: { id } });

    await this.prisma.option.delete({ where: { id } });
    return null;
  }
}
