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
exports.createUserService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("./../../errors/errorApp");
const bcryptjs_1 = require("bcryptjs");
const createUserService = ({ name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExists = yield prisma_1.prisma.user.findUnique({ where: { email } });
    if (alreadyExists) {
        throw new errorApp_1.BadRequestError('Usuário já existe');
    }
    const user = yield prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: (0, bcryptjs_1.hashSync)(password, 8)
        },
        select: {
            user_id: true,
            name: true,
            email: true,
        }
    });
    if (!user) {
        throw new errorApp_1.BadRequestError('Não foi possível criar o usuário');
    }
    return user;
});
exports.createUserService = createUserService;
//# sourceMappingURL=createUser.service.js.map