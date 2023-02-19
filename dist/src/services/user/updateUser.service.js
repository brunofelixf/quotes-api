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
exports.updateUserService = void 0;
const prisma_1 = require("./../../prisma");
const bcryptjs_1 = require("bcryptjs");
const errorApp_1 = require("../../errors/errorApp");
const updateUserService = (user_id, { name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .findUnique({ where: { user_id } });
    if (!user) {
        throw new errorApp_1.NotFoundError('Usuário não encontrado');
    }
    if (user.user_id !== user_id) {
        throw new errorApp_1.UnauthorizedError('Você não tem autorização para alterar esse usuário');
    }
    if (password) {
        password = (0, bcryptjs_1.hashSync)(password, 8);
    }
    const userUpdated = yield prisma_1.prisma.user
        .update({
        where: { user_id: user.user_id },
        data: {
            name,
            email,
            password,
        },
        select: {
            user_id: true,
            name: true,
            email: true,
            status: true,
            created_at: true,
            updated_at: true
        }
    });
    return userUpdated;
});
exports.updateUserService = updateUserService;
//# sourceMappingURL=updateUser.service.js.map