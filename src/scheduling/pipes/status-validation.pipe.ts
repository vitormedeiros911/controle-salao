import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ScheduleStatus } from '../schedule-status.enum';

export class ScheduleStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ScheduleStatus.AGENDADO, ScheduleStatus.FEITO];
  transform(value?: any) {
    if(value != null) {
      value = value.toUpperCase();
      if (!this.isStatusValid(value)) {
        throw new BadRequestException(`"${value}" é um status inválido!`);
      }

      return value;
    } else {
      throw new BadRequestException('Não foi possível atualizar o status')
    }
  }

  private isStatusValid(status: ScheduleStatus) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
