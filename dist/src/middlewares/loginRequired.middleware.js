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
exports.loginRequired = void 0;
const errorApp_1 = require("./../errors/errorApp");
const jsonwebtoken_1 = require("jsonwebtoken");
const loginRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errorApp_1.UnauthorizedError('O login é requerido');
    }
    const token = authorization.split(' ')[1];
    try {
        const data = (0, jsonwebtoken_1.verify)(token, process.env.KEY_TOKEN);
        const { name, user_id } = data;
        req.user = {
            name,
            user_id
        };
        return next();
    }
    catch (error) {
        return res.status(401).json({ error: error.message });
    }
});
exports.loginRequired = loginRequired;
//# sourceMappingURL=loginRequired.middleware.js.map