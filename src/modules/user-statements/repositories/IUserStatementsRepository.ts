import { User } from '../../users/entities/User';
import { ICreateUserAndStatementsDTO } from '../useCases/createUserAndStatements/ICreateUserAndStatementsDTO';
import { Repository } from 'typeorm';
import { Statement } from '../../statements/entities/Statement';

export interface IUserStatementsRepository {
  createUserAndStatements: (data: ICreateUserAndStatementsDTO, userRepository: Repository<User>, statementsRepository: Repository<Statement>) => Promise<ICreateUserAndStatementsDTO>;
}
