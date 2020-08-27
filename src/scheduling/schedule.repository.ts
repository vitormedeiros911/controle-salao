import { Repository, EntityRepository } from 'typeorm';

import { Schedule } from './schedule.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {}
