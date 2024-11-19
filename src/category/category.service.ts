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

  async findAll() {
    return this.prisma.category.findMany(); 
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