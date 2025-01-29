import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaModule } from 'src/helpers/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
