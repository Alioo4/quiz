import { Module } from '@nestjs/common';
import { PrismaModule } from './helpers/prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { OptionModule } from './modules/option/option.module';
import { UploadsModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permission/permission.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    SubCategoryModule,
    QuizModule,
    OptionModule,
    UploadsModule,
    AuthModule,
    PermissionModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
