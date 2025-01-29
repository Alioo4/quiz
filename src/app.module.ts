import { Module } from '@nestjs/common';
import { PrismaModule } from './helpers/prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { OptionModule } from './modules/option/option.module';
import { UploadsModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    SubCategoryModule,
    QuizModule,
    OptionModule,
    UploadsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
