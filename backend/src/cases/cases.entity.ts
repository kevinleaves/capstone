import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CaseStatus } from './enums/case-status.enum';
import { CasePriority } from './enums/case-priority.enum';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
  })
  dateTimeOpened: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  dateTimeClosed: Date | null;

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
