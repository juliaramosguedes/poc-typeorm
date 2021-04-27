import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { UpdateUserError } from "./UpdateUserError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "./IUpdateUserDTO";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, name, email, password, statement }: IUpdateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new UpdateUserError();
    }

    const passwordHash = await hash(password, 8);

    return await this.usersRepository.update({
      user_id,
      email,
      name,
      password: passwordHash,
      statement
    });
  }
}
