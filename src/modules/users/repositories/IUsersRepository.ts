import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';
import { IUpdateUserDTO } from '../useCases/updateUser/IUpdateUserDTO';
import { UpdateResult } from 'typeorm';

export interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (user_id: string) => Promise<User | undefined>;
  update: (data: IUpdateUserDTO) => Promise<User>;
}
