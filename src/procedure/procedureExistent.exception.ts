import { HttpException, HttpStatus } from '@nestjs/common';

export class ProcedureExistentException extends HttpException {
  constructor() {
    super('Procedimento já cadastrado', HttpStatus.CONFLICT);
  }
}
