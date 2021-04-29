import { AppError } from "../../../../shared/errors/AppError";

export class CreateUserAndStatementsError extends AppError {
  constructor() {
    super('User already exists');
  }
}
