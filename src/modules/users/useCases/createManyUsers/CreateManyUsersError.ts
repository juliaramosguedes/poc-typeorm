import { AppError } from "../../../../shared/errors/AppError";

export class CreateManyUsersError extends AppError {
  constructor() {
    super('User already exists');
  }
}
