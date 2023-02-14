import { Router } from "express"
import { authenticateUserController } from "../controllers/session/session.controller"
import { validatorData } from "../middlewares/validatorData.middleware"
import { loginUserSchema } from "../validations/user/loginUser.schema"

import { userRouter } from './user/user.routes';
import { quoteRouter } from './quote/quote.routes';

const routerApp = Router()

routerApp.use('/user', userRouter)
routerApp.use('/quote', quoteRouter)

routerApp.post('/login', validatorData( loginUserSchema ), authenticateUserController)

export { routerApp }