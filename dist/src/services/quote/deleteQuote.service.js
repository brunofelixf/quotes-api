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
exports.deleteQuoteService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("./../../errors/errorApp");
const errorApp_2 = require("../../errors/errorApp");
const deleteQuoteService = (user_id, quote_id) => __awaiter(void 0, void 0, void 0, function* () {
    const quote = yield prisma_1.prisma.quote
        .findUniqueOrThrow({ where: { quote_id } })
        .catch(() => {
        throw new errorApp_2.NotFoundError('Citação não encontrada');
    });
    if (quote.user_id !== user_id) {
        throw new errorApp_1.UnauthorizedError('Você não tem autorização para deletar essa citação');
    }
    yield prisma_1.prisma.quote
        .delete({
        where: { quote_id }
    })
        .catch(() => {
        throw new errorApp_2.BadRequestError('Não foi possível deletar a citação');
    });
});
exports.deleteQuoteService = deleteQuoteService;
//# sourceMappingURL=deleteQuote.service.js.map