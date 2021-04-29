import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateManyUsersUseCase } from './CreateManyUsersUseCase';

export class CreateManyUsersController {
  async execute(request: Request, response: Response) {
    const users = request.body;

    const createManyUsers = container.resolve(CreateManyUsersUseCase);

    await createManyUsers.execute(users);

    return response.status(201).send();
  }
}
