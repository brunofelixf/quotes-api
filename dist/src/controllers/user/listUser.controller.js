"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserController = void 0;
const listUser_service_1 = require("../../services/user/listUser.service");
const listUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.user;
    const user = yield (0, listUser_service_1.listUserService)(user_id);
    return res.json(user);
});
exports.listUserController = listUserController;
//# sourceMappingURL=listUser.controller.js.map