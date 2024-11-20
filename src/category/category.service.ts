import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCategoryDto): Promise<string> {
    const data = await this.prisma.category.create({ data: { title: payload.title } });
    return data.id;
  }

  async findAll(query: { page?: number; pageSize?: number; title?: string }) {
    const { page = 1, pageSize = 10, title } = query;
  
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
  
    const [categories, totalCount] = await Promise.all([
      this.prisma.category.findMany({
        where: filters, 
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.category.count({
        where: filters, 
      }),
    ]);
  
    return {
      data: categories,
      meta: {
        total: totalCount,
        page: pageNumber,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
  }
  

  async findOne(id: string) {
    return this.prisma.category.findUniqueOrThrow({ where: { id } }); // Directly return the result
  }

  async update(id: string, payload: UpdateCategoryDto): Promise<string> {
    await this.prisma.category.update({
      where: { id },
      data: { title: payload.title },
    });
    return 'Category updated successfully';
  }

  async remove(id: string): Promise<string> {
    await this.prisma.category.delete({ where: { id } });
    return 'Category deleted successfully';
  }
}