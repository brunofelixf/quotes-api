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
exports.authenticateUserService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("./../../errors/errorApp");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorApp_2 = require("../../errors/errorApp");
const authenticateUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .findUniqueOrThrow({ where: { email } })
        .catch(() => { throw new errorApp_2.NotFoundError('Usuário não encontrado'); });
    if (user.status === 'INACTIVE') {
        throw new errorApp_1.UnauthorizedError('Usuário desativado');
    }
    const passwordIsCorrect = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!passwordIsCorrect) {
        throw new errorApp_1.UnauthorizedError('Email ou Senha inválidos');
    }
    const token = (0, jsonwebtoken_1.sign)({
        name: user.name,
        user_id: user.user_id
    }, process.env.KEY_TOKEN, {
        expiresIn: "12h"
    });
    return token;
});
exports.authenticateUserService = authenticateUserService;
//# sourceMappingURL=session.service.js.map