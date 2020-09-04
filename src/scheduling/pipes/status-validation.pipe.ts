import { ScheduleStatus } from '../schedule-status.enum';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ScheduleStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ScheduleStatus.AGENDADO, ScheduleStatus.FEITO];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" é um status inválido!`);
    }

    return value;
  }

  private isStatusValid(status: ScheduleStatus) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
