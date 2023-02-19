"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const loginRequired_middleware_1 = require("./../../middlewares/loginRequired.middleware");
const createUser_controller_1 = require("../../controllers/user/createUser.controller");
const validatorData_middleware_1 = require("../../middlewares/validatorData.middleware");
const createUser_schema_1 = require("../../validations/user/createUser.schema");
const listUser_controller_1 = require("../../controllers/user/listUser.controller");
const updateUser_controller_1 = require("../../controllers/user/updateUser.controller");
const deleteUser_controller_1 = require("../../controllers/user/deleteUser.controller");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('', (0, validatorData_middleware_1.validatorData)(createUser_schema_1.createUserSchema), createUser_controller_1.createUserController);
userRouter.get('', loginRequired_middleware_1.loginRequired, listUser_controller_1.listUserController);
userRouter.patch('', loginRequired_middleware_1.loginRequired, updateUser_controller_1.updateUserController);
userRouter.delete('', loginRequired_middleware_1.loginRequired, deleteUser_controller_1.deleteUserController);
//# sourceMappingURL=user.routes.js.map