import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from './config/typeorm.config';
import { ProcedureModule } from './procedure/procedure.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    ProcedureModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    SchedulingModule,
  ],
})
export class AppModule {}
