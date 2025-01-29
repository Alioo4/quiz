import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { PrismaModule } from 'src/helpers/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
