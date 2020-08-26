import { Module } from '@nestjs/common';
import { ProcedureModule } from './procedure/procedure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [ProcedureModule, TypeOrmModule.forRoot(TypeOrmConfig)],
})
export class AppModule {}
