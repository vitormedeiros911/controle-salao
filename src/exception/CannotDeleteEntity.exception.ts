import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteEntityException extends HttpException {
  constructor() {
    super(
      'Não é possivel deletar registro, há associações',
      HttpStatus.CONFLICT,
    );
  }
}
