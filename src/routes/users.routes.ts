import { Router } from 'express';

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController';

const usersRouter = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

usersRouter.post('/', createUserController.execute);
usersRouter.post('/update', ensureAuthenticated, updateUserController.execute);

export { usersRouter };
