import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Procedure } from '../procedure/procedure.entity';
import { ScheduleStatus } from './schedule-status.enum';
import { Client } from '../client/client.entity';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: Date;

  @Column({ default: ScheduleStatus.AGENDADO })
  status: ScheduleStatus;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id', referencedColumnName: 'id' })
  procedure: Procedure;

  @Column({ name: 'procedure_id' })
  procedureId: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client;

  @Column({ name: 'client_id' })
  clientId: number;
}
