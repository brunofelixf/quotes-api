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
exports.listAllQuotesController = void 0;
const listAllQuotes_service_1 = require("../../services/quote/listAllQuotes.service");
const listAllQuotesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { skip, take } = req.query;
    skip = skip ? +skip : undefined;
    take = take ? +take : undefined;
    const quote = yield (0, listAllQuotes_service_1.listAllQuotesService)({ skip, take });
    return res.json(quote);
});
exports.listAllQuotesController = listAllQuotesController;
//# sourceMappingURL=listAllQuotes.controller.js.map