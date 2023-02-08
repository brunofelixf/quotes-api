import { Router } from "express"
import { authenticateUserController } from "../controllers/session/session.controller"
import { createUserController } from "../controllers/user/createUser.controller"
import { validatorData } from "../middlewares/validatorData.middleware"
import { createUserSchema } from "../validations/user/createUser.schema"
import { loginUserSchema } from "../validations/user/loginUser.schema"

const routerApp = Router()

routerApp.post('/user', validatorData( createUserSchema ), createUserController)

routerApp.post('/login', validatorData( loginUserSchema ), authenticateUserController)


export { routerApp }