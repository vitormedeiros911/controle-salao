import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientExistentException extends HttpException {
  constructor() {
    super('Cliente já cadastrado', HttpStatus.CONFLICT);
  }
}
