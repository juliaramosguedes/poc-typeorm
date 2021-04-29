import { Repository, Transaction, TransactionRepository } from 'typeorm';

import { User } from '../../users/entities/User';
import { Statement } from '../../statements/entities/Statement';
import { IUserStatementsRepository } from './IUserStatementsRepository';
import { ICreateUserAndStatementsDTO } from '../useCases/createUserAndStatements/ICreateUserAndStatementsDTO';

export class UserStatementsRepository implements IUserStatementsRepository {
  @Transaction()
  async createUserAndStatements({ user, statements }: ICreateUserAndStatementsDTO, @TransactionRepository(User) userRepository: Repository<User>, @TransactionRepository(Statement) statementsRepository: Repository<Statement>) {
    await userRepository.save(user);
    const promises = statements.map(async statement => await statementsRepository.save(statement))
    const newStatements = await Promise.all(promises);
    return { user: user, statements: newStatements }
  }
}
