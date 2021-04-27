import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { name, email, password, statement } = request.body;

    const updateUser = container.resolve(UpdateUserUseCase);

    await updateUser.execute({
      user_id,
      name,
      email,
      password,
      statement
    });

    return response.status(201).send();
  }
}
