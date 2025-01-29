import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/helpers/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
