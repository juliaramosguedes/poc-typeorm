import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { CreateManyUsersError } from "./CreateManyUsersError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateManyUsersDTO } from "./ICreateManyUsersDTO";

@injectable()
export class CreateManyUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(users: ICreateManyUsersDTO[]) {
    const promises = users.map(async ({ email, password, name }: ICreateManyUsersDTO) => {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new CreateManyUsersError();
      }

      const passwordHash = await hash(password, 8);

      return { email, password: passwordHash, name } as ICreateManyUsersDTO;
    })

    const newUsers = await Promise.all(promises);

    return await this.usersRepository.createMany(newUsers);
  }
}
