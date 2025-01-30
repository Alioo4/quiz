import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/helpers/prisma';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(payload: CreatePermissionDto) {
    await this.prisma.permission.create({
      data: { categoryId: payload.categoryId, userId: payload.userId },
    });
    return null;
  }

  async findAll() {
    const all = await this.prisma.permission.findMany();
    return all;
  }

  async findOne(id: string) {
    try {
      const findId = await this.prisma.permission.findUnique({ where: { id } });

      if (!findId) {
        throw new NotFoundException('This id not found');
      }

      return findId;
    } catch (error) {
      throw new NotFoundException('Permission not found');
    }
  }

  async update(id: string, payload: UpdatePermissionDto) {
    const check = await this.findOne(id);

    await this.prisma.permission.update({
      where: { id: check.id },
      data: { categoryId: payload.categoryId, userId: payload.userId },
    });

    return null;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.permission.delete({ where: { id } });
    return null;
  }
}
