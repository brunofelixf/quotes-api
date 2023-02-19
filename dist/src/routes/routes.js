"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApp = void 0;
const express_1 = require("express");
const session_controller_1 = require("../controllers/session/session.controller");
const validatorData_middleware_1 = require("../middlewares/validatorData.middleware");
const loginUser_schema_1 = require("../validations/user/loginUser.schema");
const user_routes_1 = require("./user/user.routes");
const quote_routes_1 = require("./quote/quote.routes");
const routerApp = (0, express_1.Router)();
exports.routerApp = routerApp;
routerApp.use('/user', user_routes_1.userRouter);
routerApp.use('/quote', quote_routes_1.quoteRouter);
routerApp.post('/login', (0, validatorData_middleware_1.validatorData)(loginUser_schema_1.loginUserSchema), session_controller_1.authenticateUserController);
//# sourceMappingURL=routes.js.map