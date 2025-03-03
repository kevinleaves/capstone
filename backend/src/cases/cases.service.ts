import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './cases.entity';
import { Repository } from 'typeorm';
import { CreateCaseDto } from './dtos/create-case.dto';

@Injectable()
export class CasesService {
  constructor(@InjectRepository(Case) private repo: Repository<Case>) {}

  create(createCaseDto: CreateCaseDto) {
    // new case always created with current timestamp
    const newCase = this.repo.create({
      ...createCaseDto,
      dateTimeOpened: new Date(),
    });

    // save the case
    return this.repo.save(newCase);
  }

  getAll() {
    const cases = this.repo.find();
    return cases;
  }

  getOne(id: number) {
    const foundCase = this.repo.findOne({ where: { id } });
    return foundCase;
  }

  async update(id: number, attrs: Partial<Case>) {
    const foundCase = await this.getOne(id);

    if (!foundCase) {
      throw new NotFoundException('Case not found!');
    }

    Object.assign(foundCase, attrs);

    return this.repo.save(foundCase);
  }

  async remove(id: number) {
    const foundCase = await this.getOne(id);
    if (!foundCase) {
      return new NotFoundException(
        'Attempt to delete case unsuccessful. Case was not found.',
      );
    }
    return this.repo.remove(foundCase);
  }
}
