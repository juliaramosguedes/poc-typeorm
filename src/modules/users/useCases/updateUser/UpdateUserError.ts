import { AppError } from "../../../../shared/errors/AppError";

export class UpdateUserError extends AppError {
  constructor() {
    super('User not found');
  }
}
