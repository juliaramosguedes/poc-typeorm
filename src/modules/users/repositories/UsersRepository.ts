import { getRepository, Repository, UpdateResult } from 'typeorm';

import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';
import { IUsersRepository } from './IUsersRepository';
import { IUpdateUserDTO } from '../useCases/updateUser/IUpdateUserDTO';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      email,
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.repository.findOne(user_id);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    return this.repository.save(user);
  }

  async update({ user_id, name, email, password, statements }: IUpdateUserDTO): Promise<UpdateResult> {
    return this.repository.update(user_id, { name, email, password, statements });
  }
}
