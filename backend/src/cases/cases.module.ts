import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Case } from './cases.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesController } from './cases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Case])],
  providers: [CasesService],
  controllers: [CasesController],
})
export class CasesModule {}
