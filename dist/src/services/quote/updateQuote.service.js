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
exports.updateQuoteService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("../../errors/errorApp");
const updateQuoteService = (user_id, quote_id, { text }) => __awaiter(void 0, void 0, void 0, function* () {
    const quote = yield prisma_1.prisma.quote
        .findUnique({ where: { quote_id } });
    if (!quote) {
        throw new errorApp_1.NotFoundError('Citação não encontrada');
    }
    if (quote.user_id !== user_id) {
        throw new errorApp_1.UnauthorizedError('Você não tem autorização para alterar essa citação');
    }
    const quoteUpdated = yield prisma_1.prisma.quote
        .update({
        where: { quote_id },
        data: {
            text
        },
        select: {
            quote_id: true,
            text: true,
            likes: true,
            created_at: true,
            updated_at: true
        }
    });
    return quoteUpdated;
});
exports.updateQuoteService = updateQuoteService;
//# sourceMappingURL=updateQuote.service.js.map