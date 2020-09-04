import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Procedure } from '../procedure/procedure.entity';
import { ScheduleStatus } from './schedule-status.enum';
import { Client } from '../client/client.entity';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone' })
  date: Date;

  @Column({ default: ScheduleStatus.AGENDADO })
  status: ScheduleStatus;

  @ManyToOne(() => Procedure)
  procedure: Procedure;

  @Column()
  procedureId: number;

  @ManyToOne(() => Client)
  client: Client;

  @Column()
  clientId: number;

}
