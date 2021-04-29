import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { CreateUserAndStatementsError } from './CreateUserAndStatementsError';

import { ICreateUserAndStatementsDTO } from './ICreateUserAndStatementsDTO';
import { IUserStatementsRepository } from '../../repositories/IUserStatementsRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { User } from '../../../users/entities/User';
import { Statement } from '../../../statements/entities/Statement';
import { IStatementsRepository } from '../../../statements/repositories/IStatementsRepository';
import { getRepository, Repository } from 'typeorm';

@injectable()
export class CreateUserAndStatementsUseCase {
  private usersRepository: Repository<User>;
  private statementsRepository: Repository<Statement>;

  constructor(
    @inject('UserStatementsRepository')
    private userStatementsRepository: IUserStatementsRepository,
  ) {
    this.usersRepository = getRepository(User);
    this.statementsRepository = getRepository(Statement);
  }

  async execute({ name, email, password, statements }: ICreateUserAndStatementsDTO) {
    const passwordHash = await hash(password, 8);

    const newUser = new User({email, password: passwordHash, name, statements});
    const newStatements = statements.map(({ amount, description, type }) => new Statement({ amount, description, type, user: newUser }))

    return await this.userStatementsRepository.createUserAndStatements({ user: newUser, statements: newStatements }, this.usersRepository, this.statementsRepository);
  }
}
