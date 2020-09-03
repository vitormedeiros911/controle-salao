import { HttpException, HttpStatus } from '@nestjs/common';

export class ScheduleExistentException extends HttpException {
  constructor() {
    super('Agendamento já cadastrado', HttpStatus.CONFLICT);
  }
}
