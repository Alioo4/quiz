import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { QuizModule } from './quiz/quiz.module';
import { OptionModule } from './option/option.module';
import { UploadsModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    SubCategoryModule,
    QuizModule,
    OptionModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
