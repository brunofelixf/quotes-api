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
exports.createQuoteService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("../../errors/errorApp");
const createQuoteService = ({ user_id, text }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { user_id } });
    if (!user) {
        throw new errorApp_1.BadRequestError('Usuário não existe');
    }
    const quote = yield prisma_1.prisma.quote.create({
        data: {
            text,
            user: { connect: { user_id } }
        },
        select: {
            quote_id: true,
            text: true,
            created_at: true
        }
    });
    if (!quote) {
        throw new errorApp_1.BadRequestError('Não foi possível criar a citação');
    }
    return quote;
});
exports.createQuoteService = createQuoteService;
//# sourceMappingURL=createQuote.service.js.map