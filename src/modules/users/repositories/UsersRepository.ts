import { getManager, getRepository, Repository, Transaction, TransactionRepository } from 'typeorm';

import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';
import { IUsersRepository } from './IUsersRepository';
import { IUpdateUserDTO } from '../useCases/updateUser/IUpdateUserDTO';
import { ICreateManyUsersDTO } from '../useCases/createManyUsers/ICreateManyUsersDTO';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  @Transaction()
  save(user: User, @TransactionRepository(User) userRepository: Repository<User>) {
    return userRepository.save(user);
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

  async update({ user_id, name, email, password, statement }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, { relations: ['statement'] });

    if (user) {
      user.statement = statement.map((data) => ({ ...user.statement, ...data, user }));
      user.name = name;
      user.email = email;
      user.password = password;

      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(user);
      });

      return user;
    }
  }

  async createMany(users: ICreateManyUsersDTO[]): Promise<User[]> {
    const newUsers = users.map(({ name, email, password }) => this.repository.create({ name, email, password }));

    await getManager().transaction(async transactionalEntityManager => {
      newUsers.map(async (user) => {
        await transactionalEntityManager.save(user);
      });
    });

    return newUsers;
  }
}
