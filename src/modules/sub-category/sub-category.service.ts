import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PrismaService } from 'src/helpers/prisma';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateSubCategoryDto) {
    const data = await this.prisma.subCategory.create({
      data: { title: payload.title, categoryId: payload.categoryId },
    });
    return data.id;
  }

  async findAll(query: {
    page?: number;
    pageSize?: number;
    title?: string;
    categoryId?: string;
  }) {
    const { page = 1, pageSize = 10, title, categoryId } = query;

    const pageNumber = Number(page) || 1;
    const size = Number(pageSize) || 10;
    const skip = (pageNumber - 1) * size;

    const filters: any = {};
    if (title) {
      filters.title = {
        contains: title,
        mode: 'insensitive',
      };
    }
    if (categoryId) {
      filters.categoryId = categoryId;
    }

    const [subCategories, totalCount] = await Promise.all([
      this.prisma.subCategory.findMany({
        where: filters,
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      this.prisma.subCategory.count({
        where: filters,
      }),
    ]);

    return {
      data: subCategories,
      meta: {
        total: totalCount,
        page: pageNumber,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
  }

  async findOne(id: string) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({
      where: { id },
    });
    return data;
  }

  async update(id: string, payload: UpdateSubCategoryDto) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({
      where: { id },
    });

    await this.prisma.subCategory.update({
      where: { id },
      data: { title: payload.title, categoryId: payload.categoryId },
    });
    return null;
  }

  async remove(id: string) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({
      where: { id },
    });

    await this.prisma.subCategory.delete({ where: { id } });
    return null;
  }
}
