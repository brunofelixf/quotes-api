import { loginRequired } from './../../middlewares/loginRequired.middleware';
import { createUserController } from "../../controllers/user/createUser.controller"
import { validatorData } from "../../middlewares/validatorData.middleware"
import { createUserSchema } from "../../validations/user/createUser.schema"
import { listUserController } from '../../controllers/user/listUser.controller';
import { updateUserController } from '../../controllers/user/updateUser.controller';
import { deleteUserController } from '../../controllers/user/deleteUser.controller';
import { Router } from 'express';

const userRouter =  Router()

    userRouter.post('', validatorData( createUserSchema ), createUserController)
    userRouter.get('', loginRequired, listUserController)
    userRouter.patch('', loginRequired, updateUserController)
    userRouter.delete('', loginRequired, deleteUserController)

export { userRouter }