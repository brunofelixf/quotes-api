import { loginRequired } from './../middlewares/loginRequired.middleware';
import { Router } from "express"
import { authenticateUserController } from "../controllers/session/session.controller"
import { createUserController } from "../controllers/user/createUser.controller"
import { validatorData } from "../middlewares/validatorData.middleware"
import { createUserSchema } from "../validations/user/createUser.schema"
import { loginUserSchema } from "../validations/user/loginUser.schema"
import { listUserController } from '../controllers/user/listUser.controller';
import { updateUserController } from '../controllers/user/updateUser.controller';
import { deleteUserController } from '../controllers/user/deleteUser.controller';
import { createQuoteSchema } from '../validations/quote/createQuote.schema';
import { createQuoteController } from '../controllers/quote/createQuote.controller';

const routerApp = Router()

// User
routerApp.post('/user', validatorData( createUserSchema ), createUserController)
routerApp.get('/user', loginRequired, listUserController)
routerApp.patch('/user', loginRequired, updateUserController)
routerApp.delete('/user', loginRequired, deleteUserController)

// Login
routerApp.post('/login', validatorData( loginUserSchema ), authenticateUserController)

// Quote
routerApp.post('/quote', loginRequired, validatorData( createQuoteSchema ), createQuoteController)


export { routerApp }