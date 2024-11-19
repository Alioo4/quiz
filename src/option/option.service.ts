import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class OptionService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(payload: CreateOptionDto) {
    const data = await this.prisma.option.create({data: {text: payload.text, isCorrect: payload.isCorrect, quizId: payload.quizId}})
    return data.id;
  }

  async findAll() {
    return await this.prisma.option.findMany();
  }

  async findOne(id: string) {
    const data = await this.prisma.option.findUniqueOrThrow({where: {id}})
    return data;
  }

  async update(id: string, payload: UpdateOptionDto) {
    const data = await this.prisma.option.findUniqueOrThrow({where: {id}})

    await this.prisma.option.update({where: {id}, data: {text: payload.text, isCorrect: payload.isCorrect, quizId: payload.quizId}})
    return null;
  }

  async remove(id: string) {
    await this.prisma.option.findUniqueOrThrow({where: {id}})

    await this.prisma.option.delete({where: {id}})
    return null;
  }
}
