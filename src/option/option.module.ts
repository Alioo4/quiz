import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
