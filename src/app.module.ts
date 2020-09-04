import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from './config/typeorm.config';
import { ProcedureModule } from './procedure/procedure.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ProcedureModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
    SchedulingModule,
    ClientModule,
  ],
})
export class AppModule {}
