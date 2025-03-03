import { IsDate, IsEnum, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus } from '../enums/case-status.enum';
import { CasePriority } from '../enums/case-priority.enum';

export class CreateCaseDto {
  @IsDate()
  @Type(() => Date)
  dateTimeOpened: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateTimeClosed: Date;

  @IsEnum(CaseStatus)
  status: CaseStatus;

  @IsEnum(CasePriority)
  priority: CasePriority;

  @IsString()
  subject: string;
}
