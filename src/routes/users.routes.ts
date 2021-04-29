import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';
import { CreateManyUsersController } from '../modules/users/useCases/createManyUsers/CreateManyUsersController';
import { CreateUserAndStatementsController } from '../modules/user-statements/useCases/createUserAndStatements/CreateUserAndStatementsController';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const createManyUsersController = new CreateManyUsersController();
const createUserAndStatementsController = new CreateUserAndStatementsController();

usersRouter.post('/', createUserController.execute);
usersRouter.post('/update', ensureAuthenticated, updateUserController.execute);
usersRouter.post('/many', createManyUsersController.execute);
usersRouter.post('/create', createUserAndStatementsController.execute);

export { usersRouter };
