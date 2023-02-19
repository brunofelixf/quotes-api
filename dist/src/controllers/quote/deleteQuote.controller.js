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
exports.deleteQuoteController = void 0;
const deleteQuote_service_1 = require("../../services/quote/deleteQuote.service");
const deleteQuoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quote_id } = req.params;
    const { user_id } = req.user;
    yield (0, deleteQuote_service_1.deleteQuoteService)(user_id, quote_id);
    return res.status(204).send();
});
exports.deleteQuoteController = deleteQuoteController;
//# sourceMappingURL=deleteQuote.controller.js.map