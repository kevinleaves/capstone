import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateCaseDto } from './dtos/create-case.dto';
import { UpdateCaseDto } from './dtos/update-case.dto';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private casesService: CasesService) {}

  @Post()
  createCase(@Body() body: CreateCaseDto) {
    return this.casesService.create(body);
  }

  @Get()
  getAllCases() {
    return this.casesService.getAll();
  }

  @Get(':id')
  async getCaseById(@Param('id') id: number) {
    const foundCase = await this.casesService.getOne(id);
    if (!foundCase) {
      throw new NotFoundException('Case not found!');
    }

    return foundCase;
  }

  @Patch(':id')
  updateCaseById(@Param('id') id: number, @Body() body: UpdateCaseDto) {
    return this.casesService.update(id, body);
  }

  @Delete(':id')
  deleteCase(@Param('id') id: number) {
    return this.casesService.remove(id);
  }
}
