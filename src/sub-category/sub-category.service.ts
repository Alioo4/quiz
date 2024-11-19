import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(payload: CreateSubCategoryDto) {
    const data = await this.prisma.subCategory.create({data: {title: payload.title, categoryId: payload.categoryId}})
    return data.id;
  }

  async findAll() {
    return await this.prisma.subCategory.findMany();
  }

  async findOne(id: string) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({where: {id}})
    return data;
  }

  async update(id: string, payload: UpdateSubCategoryDto) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({where: {id}})

    await this.prisma.subCategory.update({where: {id}, data: {title: payload.title, categoryId: payload.categoryId}})
    return null;
  }

  async remove(id: string) {
    const data = await this.prisma.subCategory.findUniqueOrThrow({where: {id}})

    await this.prisma.subCategory.delete({where: {id}})
    return null;
  }
}
