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
exports.createQuoteController = void 0;
const createQuote_service_1 = require("../../services/quote/createQuote.service");
const createQuoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const { user_id } = req.user;
    const data = { user_id, text };
    const quote = yield (0, createQuote_service_1.createQuoteService)(data);
    return res.status(201).json(quote);
});
exports.createQuoteController = createQuoteController;
//# sourceMappingURL=createQuote.controller.js.map