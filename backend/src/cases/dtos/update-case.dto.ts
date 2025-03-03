import { IsDate, IsEnum, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus } from '../enums/case-status.enum';
import { CasePriority } from '../enums/case-priority.enum';

export class UpdateCaseDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateTimeOpened: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateTimeClosed: Date;

  @IsEnum(CaseStatus)
  @IsOptional()
  status: CaseStatus;

  @IsEnum(CasePriority)
  @IsOptional()
  priority: CasePriority;

  @IsString()
  @IsOptional()
  subject: string;
}
