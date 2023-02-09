import { loginRequired } from './../middlewares/loginRequired.middleware';
import { Router } from "express"
import { authenticateUserController } from "../controllers/session/session.controller"
import { createUserController } from "../controllers/user/createUser.controller"
import { validatorData } from "../middlewares/validatorData.middleware"
import { createUserSchema } from "../validations/user/createUser.schema"
import { loginUserSchema } from "../validations/user/loginUser.schema"
import { listUserController } from '../controllers/user/listUser.controller';
import { updateUserController } from '../controllers/user/updateUser.controller';

const routerApp = Router()

// User
routerApp.post('/user', validatorData( createUserSchema ), createUserController)
routerApp.get('/user', loginRequired, listUserController)
routerApp.patch('/user', loginRequired, updateUserController)


routerApp.post('/login', validatorData( loginUserSchema ), authenticateUserController)


export { routerApp }