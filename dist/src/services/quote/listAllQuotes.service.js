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
exports.listAllQuotesService = void 0;
const prisma_1 = require("./../../prisma");
const errorApp_1 = require("../../errors/errorApp");
const listAllQuotesService = ({ skip, take }) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield prisma_1.prisma.quote
        .findMany({
        skip: skip,
        take: take,
        orderBy: { created_at: 'desc' },
        select: {
            quote_id: true,
            text: true,
            likes: { select: { user_id: true } },
            user: { select: { name: true } },
            created_at: true,
        }
    });
    if (quotes.length == 0) {
        throw new errorApp_1.NotFoundError("Citações não encontrado");
    }
    return quotes;
});
exports.listAllQuotesService = listAllQuotesService;
//# sourceMappingURL=listAllQuotes.service.js.map