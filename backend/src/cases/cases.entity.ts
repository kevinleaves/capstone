import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CaseStatus } from './enums/case-status.enum';
import { CasePriority } from './enums/case-priority.enum';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTimeOpened: Date;

  @Column()
  dateTimeClosed: Date;

  @Column({
    type: 'text',
    default: CaseStatus.NEW,
  })
  status: CaseStatus;

  @Column({
    type: 'text',
    default: CasePriority.LOW,
  })
  priority: CasePriority;

  @Column({ type: 'text' })
  subject: string;
}
