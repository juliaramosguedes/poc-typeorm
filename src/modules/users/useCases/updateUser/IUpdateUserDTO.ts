import { Statement } from '../../../statements/entities/Statement';

export interface IUpdateUserDTO {
  user_id: string;
  name: string;
  email: string;
  password: string;
  statements: Statement[];
}
