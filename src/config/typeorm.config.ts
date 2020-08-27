import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Procedure } from '../procedure/procedure.entity';
import { Schedule } from '../scheduling/schedule.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'salao',
  entities: [Procedure, Schedule],
  synchronize: true,
};
