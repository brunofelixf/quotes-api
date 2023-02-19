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
exports.listQuoteController = void 0;
const listQuote_service_1 = require("../../services/quote/listQuote.service");
const listQuoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.user;
    let { skip, take } = req.query;
    skip = skip ? +skip : undefined;
    take = take ? +take : undefined;
    const quote = yield (0, listQuote_service_1.listQuoteService)(user_id, { skip, take });
    return res.json(quote);
});
exports.listQuoteController = listQuoteController;
//# sourceMappingURL=listQuote.controller.js.map