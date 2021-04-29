import { User } from '../../../users/entities/User';
import { Statement } from '../../../statements/entities/Statement';

export interface ICreateUserAndStatementsDTO {
  user: User;
  statements: Statement[];
}
