import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

import { SchedulingModule } from '../scheduling/scheduling.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientRepository]),
    forwardRef(() => SchedulingModule),
  ],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
