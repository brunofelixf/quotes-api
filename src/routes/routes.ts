import { Router } from "express"
import { createUserController } from "../controllers/user/createUser.controller"
import { validatorDataMiddleware } from "../middlewares/validatorData.middleware"
import { createUserSchema } from "../validations/user/createUser.schema"

const routerApp = Router()

routerApp.post('/user', validatorDataMiddleware( createUserSchema ), createUserController)

export { routerApp }