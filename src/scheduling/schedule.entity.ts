import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Procedure } from '../procedure/procedure.entity';
import { ScheduleStatus } from './schedule-status.enum';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone' })
  date: Date;

  @Column()
  client: string;

  @Column({ default: ScheduleStatus.AGENDADO })
  status: ScheduleStatus;

  @ManyToOne(type => Procedure)
  procedure: Procedure;

  @Column()
  procedureId: number;
}
