import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserAndStatementsUseCase } from './CreateUserAndStatementsUseCase';

export class CreateUserAndStatementsController {
  async execute(request: Request, response: Response) {
    const users = request.body;

    const createManyUsers = container.resolve(CreateUserAndStatementsUseCase);

    await createManyUsers.execute(users);

    return response.status(201).send();
  }
}
